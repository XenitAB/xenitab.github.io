const Fs = require("fs");
const Path = require("path");

const {
  spawn_promise,
  get_md_files,
  copy_folder,
  find_folder,
  write_sidebar,
  fix_files_and_copy,
} = require("./utils");

const [_, __, name, title = name, docs_root] = process.argv;
const DEVMODE = process.env.DEVMODE === "true";

if (name == null || name === "") {
  console.info(`
------------------------------------
Usage is: sync-docs.json <repo-name>
------------------------------------`);
  console.warn(new Error("Name is not set"));
  process.exit(1);
}

const docs_path = Path.resolve("docs", name);
const output_path = Path.resolve("output", name);

Fs.rmdirSync(docs_path, { force: true, recursive: true });
Fs.mkdirSync(docs_path);

const git_args = [
  "clone",
  `https://github.com/XenitAB/${name}.git`,
  output_path,
];
console.info(`Cloning XenitAB/${name} into ${output_path} with the following command:
git ${git_args.join(" ")}`);

(DEVMODE
  ? Promise.resolve()
  : spawn_promise("git", git_args, { encoding: "utf-8" })
)
  .then((clone_result) => {
    return get_md_files(output_path);
  })
  .then(async (files) => {
    const assets_source_folder = await find_folder(output_path, "assets");
    const assets_folder = Path.join(docs_path, "assets");

    if (assets_source_folder != null) {
      await copy_folder(assets_source_folder, assets_folder);
    }
    return Promise.all(
      files
        .filter((file) => !file.path.includes("/charts/"))
        .map(async (file) => {
          // Get foldername and filename
          // .../<folder_name>/<file_name>.md
          const [full_match, folder_name, file_name] = file.path.match(
            /.*\/(.*)\/(.*)\.md$/
          );

          let slug = name; // Used for pretty urls
          let new_path = docs_path; // Where to put the document

          // Special case if docs_root is supplied, used for terraform-modules repo
          if (docs_root != null && full_match.includes(`/${docs_root}/`)) {
            // The relative path from docs root to file path
            // eg. <docs_root>/foo/bar/README.md
            const relative = Path.relative(
              Path.join(output_path, docs_root),
              file.path
            );

            const s = relative.split("/");

            // Calculate path
            // if we have root_path/foo/bar/README.md
            if (s.length === 3) {
              new_path = Path.join(new_path, s[0], `${s[1]}.md`);
            } else if (s[2] === "CHANGELOG.md") {
              new_path = Path.join(new_path, s[0], `${s[1]}-changelog.md`);
            } else {
              new_path = Path.join(new_path, relative);
            }

            // Calculate slug
            if (s.length === 2) {
              slug = Path.join(slug, s[0], "overview");
            } else {
              slug = Path.join(slug, s[0], s[1]);
            }
          } else {
            // Normal case used for other repos
            if (folder_name === name) {
              slug = Path.join(slug, "overview");
            } else {
              slug = Path.join(slug, folder_name);
            }
            if (folder_name === name) {
              new_path = Path.join(new_path, `${file_name}.md`);
            } else {
              new_path = Path.join(new_path, `${folder_name}.md`);
            }
          }

          // Calculate the path for editing
          // TODO: Support different main branches
          const repo_file_path = file.path.split(`${name}/`)[1];
          const custom_edit_url = `https://github.com/XenitAB/${name}/edit/main/${repo_file_path}`;

          await fix_files_and_copy({
            repo: name,
            src: file.path,
            dest: new_path,
            slug: `/${slug}`,
            custom_edit_url,
            assets_folder,
          });
          return new_path;
        })
    );
  })
  .then(async (result) => {
    await write_sidebar(title, result);
  })
  .catch((e) => {
    console.warn(e);
  })
  .then((_) => {
    if (!DEVMODE) {
      Fs.promises.rmdir(output_path, { force: true, recursive: true });
    }
  });
