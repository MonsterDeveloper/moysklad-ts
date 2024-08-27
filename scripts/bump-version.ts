import { $ } from "bun";

const bumpType = process.argv[2];

if (bumpType !== "patch" && bumpType !== "minor" && bumpType !== "major") {
  console.error("Invalid bump type. Use 'patch', 'minor' or 'major'.");
  process.exit(1);
}

const npmOutput =
  await $`npm version ${bumpType} --git-tag-version=false`.text();

console.log(npmOutput);
