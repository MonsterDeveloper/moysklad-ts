// A script to change the version of Bun in CI files to the current one

import process from "node:process"
import { $, Glob } from "bun"

const start = performance.now()

console.log("Starting upgrade-bun script...")

// Check if there are uncommited changes, and exit if there are
const gitStatus = await $`git status --porcelain`.text()

if (gitStatus.length > 0) {
  console.error(
    "There are uncommited changes. Please commit them before running this script.",
  )
  process.exit(1)
}

const currentVersion = Bun.version

console.log(`Current Bun version is ${currentVersion}`)

////////////////////////////////////////
////          package.json          ////
////////////////////////////////////////
const packageJson = await Bun.file("package.json").json()
packageJson.packageManager = `bun@${currentVersion}`
await Bun.write("package.json", JSON.stringify(packageJson, null, 2))
console.log("Updated package.json")

////////////////////////////////////////
////         GitHub Actions         ////
////////////////////////////////////////
const githubActionsGlob = new Glob(".github/workflows/*.yml")

for await (const filename of githubActionsGlob.scan({ dot: true })) {
  const content = await Bun.file(filename).text()

  // Match text "bun-version: x.x.x" and replace it with the current version
  const newContent = content.replace(
    /bun-version: \d+\.\d+\.\d+/g,
    `bun-version: ${currentVersion}`,
  )

  await Bun.write(filename, newContent)
  console.log(`Updated GitHub Actions file ${filename}`)
}

const end = performance.now()
const timeSpentSeconds = (end - start) / 1000

// Commit the changes
await $`git add .`
await $`git commit -m "chore(repo): upgrade bun to \`${currentVersion}\`"`

console.log(
  `upgrade-bun script completed in ${timeSpentSeconds.toPrecision(1)} seconds.`,
)
