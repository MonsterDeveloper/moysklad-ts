import { $ } from "bun";

// Check if there are uncommited changes, and exit if there are
const gitStatus = await $`git status --porcelain`.text();

if (gitStatus.length > 0) {
  console.error(
    "There are uncommited changes. Please commit them before running this script.",
  );
  process.exit(1);
}

const JSR_JSON_FILENAME = "jsr.json";

const jsrJsonFile = Bun.file(JSR_JSON_FILENAME);

if (!(await jsrJsonFile.exists())) {
  console.error(`Can't find 'jsr.json' file.`);
  process.exit(1);
}

const jsrJson = await jsrJsonFile.text();

const bumpType = process.argv[2];

if (bumpType !== "patch" && bumpType !== "minor" && bumpType !== "major") {
  console.error(
    `Invalid bump type: '${bumpType}'. Use 'patch', 'minor' or 'major'.`,
  );
  process.exit(1);
}

const newVersion =
  await $`npm version ${bumpType} --git-tag-version=false`.text();

if (!newVersion.startsWith("v")) {
  console.error(`Invalid NPM version output: ${newVersion}`);
  process.exit(1);
}

const newJsrJson = jsrJson.replace(
  /"version":\s*"[^"]+"/,
  `"version": "${newVersion.slice(1, -1)}"`,
);

await Bun.write(JSR_JSON_FILENAME, newJsrJson);

await $`git add .`;
await $`git commit -m "chore(repo): bump library version to ${newVersion}"`;
await $`git tag ${newVersion}`;
await $`git push --tags`;

console.log(`Version bumped to ${newVersion} and pushed to git.`);
