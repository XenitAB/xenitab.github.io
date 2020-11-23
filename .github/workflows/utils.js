const Fs = require("fs");
const Cp = require("child_process");
const Path = require("path");
const sidebars = require("../../sidebars");

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

async function get_files(path) {
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
    files.push(...(await get_files(Path.join(path, folder.name))));

  return files;
}

async function find_folder(path, search = "assets") {
  const entries = await Fs.promises.readdir(path, { withFileTypes: true });

  const dirs = entries.filter((d) => d.isDirectory());
  const dir = dirs.find((d) => d.name === search);
  if (dir != null) {
    return Path.join(path, dir.name);
  } else {
    Promise.all(dirs.map((d) => Path.join(path, d.name)).map(find_folder)).then(
      (dirs) => dirs.filter((d) => d != null)[0]
    );
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

async function write_sidebar(
  name,
  files,
  sidebar_file = Path.join(__dirname, "..", "..", "./sidebars.js")
) {
  const sidebar = require(sidebar_file);
  const ids = files.map((f) => f.match(/docs\/(.*)\.md/)[1]);

  sidebar["docs"][name] = ids;

  const sidebar_content = `module.exports = ${JSON.stringify(
    sidebar,
    null,
    2
  )}`;
  await Fs.promises.writeFile(sidebar_file, sidebar_content, "utf8");

  return sidebar;
}

module.exports = {
  spawn_promise,
  get_files,
  copy_folder,
  find_folder,
  write_sidebar,
};
