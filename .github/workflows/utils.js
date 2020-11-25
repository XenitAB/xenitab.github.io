const Fs = require("fs");
const Cp = require("child_process");
const Path = require("path");

function spawn_promise(command, args, options) {
  return new Promise((resolve, reject) => {
    const cp = Cp.spawn(command, args, options);

    const data = [];

    cp.stdout.on("data", (d) => {
      data.push(d);
    });

    cp.on("exit", (code) => {
      if (code === 0) {
        resolve(data.join(""));
      } else {
        reject(data.join(""));
      }
    });
  });
}

async function get_md_files(path) {
  const entries = await Fs.promises.readdir(path, { withFileTypes: true });

  // Get files within the current directory and add a path key to the file objects
  const files = entries
    .filter((file) => !file.isDirectory())
    .filter((file) => file.name.includes(".md"))
    .map((file) => ({ ...file, path: Path.join(path, file.name) }));

  // Get folders within the current directory
  const folders = entries.filter((folder) => folder.isDirectory());

  /*
    Add the found files within the subdirectory to the files array by calling the
    current function itself
  */
  for (const folder of folders)
    files.push(...(await get_md_files(Path.join(path, folder.name))));

  return files;
}

async function find_folder(path, search = "assets") {
  const entries = await Fs.promises.readdir(path, { withFileTypes: true });

  const dirs = entries.filter((d) => d.isDirectory());
  const dir = dirs.find((d) => d.name === search);
  if (dir != null) {
    const folder_path = Path.join(path, dir.name);
    return folder_path;
  } else {
    return Promise.all(
      dirs.map((d) => Path.join(path, d.name)).map(find_folder)
    ).then((dirs) => {
      return dirs.filter((d) => d != null)[0];
    });
  }
}

async function copy_folder(src, dest) {
  const entries = await Fs.promises.readdir(src, { withFileTypes: true });
  await Fs.promises.mkdir(dest);

  for (const e of entries) {
    const current_src = Path.join(src, e.name);
    const current_dest = Path.join(dest, e.name);
    if (e.isFile()) {
      await Fs.promises.copyFile(current_src, current_dest);
    } else if (e.isDirectory()) {
      await copy_folder(current_src, current_dest);
    }
  }
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function write_sidebar(
  name,
  files,
  sidebar_file = Path.join(__dirname, "..", "..", "./sidebars.js")
) {
  const sidebar = require(sidebar_file);
  const ids = files
    .map((f) => f.match(/docs\/(.*)\.md/)[1])
    .reduce((acc, id) => {
      const id_split = id.split("/");
      // repo/sub_folder/name
      if (id_split.length === 3) {
        const sub_folder = capitalizeFirstLetter(id_split[1]);
        const o = acc.find((a) => typeof a !== "string") || {};
        const next = [
          ...acc.filter((a) => typeof a === "string"),
          {
            ...o,
            [sub_folder]: [...(o[sub_folder] != null ? o[sub_folder] : []), id],
          },
        ];
        return next;
      } else {
        return [...acc, id];
      }
    }, []);

  sidebar["docs"][name] = ids;

  const sidebar_content = `module.exports = ${JSON.stringify(
    sidebar,
    null,
    2
  )}`;
  await Fs.promises.writeFile(sidebar_file, sidebar_content, "utf8");

  return sidebar;
}

async function fix_files_and_copy({
  repo,
  src,
  dest,
  slug,
  custom_edit_url,
  assets_folder,
}) {
  const assets_relative_path = Path.relative(Path.dirname(dest), assets_folder);

  const slug_parts = slug.split("/").filter((x) => x !== "");
  const pre_slug = slug_parts.slice(0, slug_parts.length - 1).join("/");

  const fixes = [
    { regex: /[\.\/]+assets/, replacement: assets_relative_path },
    { regex: /<br>/, replacement: "<br />" },
  ];

  const content = await Fs.promises.readFile(src, { encoding: "utf-8" });

  const next_content = fixes.reduce((last_content, fix) => {
    return last_content.split(fix.regex).join(fix.replacement);
  }, content);

  const readme_regex = /\((modules\/)?(.*)\/README\.md\)/;
  let match = readme_regex.test(next_content);
  let link_fixed_content = next_content;
  while (match) {
    link_fixed_content = link_fixed_content.replace(
      readme_regex,
      `(/docs/${pre_slug}/$2)`
    );

    match = readme_regex.test(link_fixed_content);
  }

  const title_match = link_fixed_content.match(/^# (.*)\n/);

  const t =
    title_match == null
      ? link_fixed_content
      : `---
title: ${title_match[1]}
slug: ${slug.replace("/overview", "")}
custom_edit_url: ${custom_edit_url}${
          slug != null && slug.includes("overview")
            ? "\nsidebar_label: Overview"
            : ""
        }
---
${link_fixed_content.replace(title_match[0], "")}`;

  await Fs.promises.mkdir(Path.dirname(dest), { recursive: true });
  await Fs.promises.writeFile(dest, t, "utf8");
}

module.exports = {
  spawn_promise,
  get_md_files,
  copy_folder,
  find_folder,
  write_sidebar,
  fix_files_and_copy,
};
