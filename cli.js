#!/usr/bin/env node
import cp from "child_process";
import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import { promisify } from "util";
// cli spinners
import ora from "ora";

const projectPath = process.cwd();
const nuxtContentPath = path.join(projectPath, ".nuxt-mkdocs");
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const exec = promisify(cp.exec);

// create project directory
if (fs.existsSync(nuxtContentPath)) {
  console.log(
    `A nuxt-mkdocs project already exist in the current directory, please delete .nuxt-mkdocs if you wish to regenerate the module.`
  );
  process.exit(1);
}

try {
  const cnaSpinner = ora("Generating nuxt source...").start();
  // create a nuxt content app in .nuxt-mkdocs
  await exec(
    `npx --yes --quiet nuxi init .nuxt-mkdocs -t content --package-manager npm --git-init 0`
  );
  cnaSpinner.succeed();

  const initSpinner = ora("Initializing content directory...").start();
  // create package.json
  fs.copyFileSync(
    path.join(__dirname, "template/package.json"),
    path.join(projectPath, "package.json")
  );
  // remove default nuxt content folder
  fs.rmSync(path.join(nuxtContentPath, "content"), {
    recursive: true,
    force: true,
  });

  fs.rmSync(path.join(nuxtContentPath, "server"), {
    recursive: true,
    force: true,
  });

  // load the nuxt config file
  let nuxtConfig = fs.readFileSync(
    path.join(nuxtContentPath, "nuxt.config.ts"),
    "utf8"
  );

  nuxtConfig = `import path from "path"\n\n` + nuxtConfig;

  // set nuxt config content settings
  nuxtConfig = nuxtConfig.replace(/(?<=defineNuxtConfig\({)/g, (match) => {
    // load and return the replacement file
    return fs.readFileSync(
      path.join(__dirname, "template/nuxt.config"),
      "utf8"
    );
  });

  // disable devtools since they aren't really needed (except for theme development)
  nuxtConfig = nuxtConfig.replace(
    /devtools: { enabled: true },/g,
    `devtools: { enabled: false },`
  );

  // save changes to nuxt config
  fs.writeFileSync(path.join(nuxtContentPath, "nuxt.config.ts"), nuxtConfig);

  // Initialize content directory
  fs.copySync(
    path.join(__dirname, "template/docs"),
    path.join(projectPath, "docs")
  );

  fs.writeFileSync(path.join(projectPath, ".gitignore"), `.nuxt-mkdocs\ndist`);

  if (fs.existsSync(path.join(projectPath, "package-lock.json"))) {
    fs.rmSync(fs.existsSync(path.join(projectPath, "package-lock.json")));
  }

  initSpinner.succeed();

  console.log("The installation is done!");
  console.log("You can now serve your docs with:");
  console.log(`    npm run serve`);
} catch (error) {
  // commented out for testing
  // // clean up in case of error, so the user does not have to do it manually
  // fs.rmSync(projectPath, { recursive: true, force: true });
  console.log(error);
}
