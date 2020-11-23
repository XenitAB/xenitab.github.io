const Fs = require("fs");
const Path = require("path");

const {
  spawn_promise,
  get_files,
  copy_folder,
  find_folder,
  write_sidebar,
} = require("./utils");

const [_, __, name, title = name] = process.argv;

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

spawn_promise("git", git_args, { encoding: "utf-8" })
  .then((clone_result) => {
    return get_files(output_path);
  })
  .then((files) =>
    Promise.all(
      files.map(async (file) => {
        const path_pars = file.path.split("/");
        const folder_name = path_pars[path_pars.length - 2];
        const new_path = Path.join(
          docs_path,
          `${folder_name !== name ? folder_name : "README"}.md`
        );
        await Fs.promises.copyFile(file.path, new_path);
        return new_path;
      })
    )
  )
  .then((result) => {
    write_sidebar(title, result);
    find_folder(output_path, "assets");
  })
  .then(async (asset_folder) => {
    if (asset_folder != null) {
      await copy_folder(asset_folder, Path.join(docs_path, "assets"));
    }
    return Fs.promises.rmdir(output_path, { force: true, recursive: true });
  })
  .catch((e) => {
    console.warn(e);
    process.exit(1);
  });
