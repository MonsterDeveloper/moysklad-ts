# Contribute to moysklad-ts
## Bugs

`moysklad-ts` is using [GitHub issues](https://github.com/MonsterDeveloper/moysklad-ts/issues) to manage bugs. We keep a close eye on them. Before filing a new issue, try to ensure your problem does not already exist.


## Before Submitting a Pull Request

The core team will review your pull request and either merge it, request changes, or close it.

## Contribution Prerequisites

- You have [Node.js](https://nodejs.org/en/) at version >= 18.x.x and <= 20.x.x and [pnpm](https://pnpm.io) at v8 installed.
- You are familiar with [Git](https://git-scm.com).

	> You can also use GitPod to instantly initialize a development environment. Just click the GitPod button in the [README](./README.md).

**Before submitting your pull request** make sure the following requirements are fulfilled:

- Fork the repository and create your new branch from `main`.
- Run `pnpm i` in the root of the repository.
- If you've fixed a bug or added code that should be tested, please make sure to add tests
- Ensure the test suites are passing: `pnpm test`
- Make sure your code lints by running `pnpm lint`.
- If your contribution fixes an existing issue, please make sure to link it in your pull request.

## Development Workflow

### 1. Fork the [repository](https://github.com/MonsterDeveloper/moysklad-ts)

[Go to the repository](https://github.com/MonsterDeveloper/moysklad-ts) and fork it using your own GitHub account.

### 2. Clone your repository

```bash
git clone git@github.com:YOUR_USERNAME/moysklad-ts.git
```

### 3. Install the dependencies

Go to the root of the repository and run the setup:

```bash
cd moysklad-ts
pnpm i
```

**Awesome!**

### 6. Available commands

- `pnpm dev` starts docs dev server.
- `pnpm build:docs` builds the docs app.
- `pnpm build:lib` builds the library.
- `pnpm lint` lints the codebase.
- `pnpm test` runs the test suites.
- `pnpm test:watch` runs an interactive test watcher.	
- `pnpm coverage` generates the coverage report.
---

## Miscellaneous

### Repository Organization

We chose to use a monorepo design using [pnpm Workspace](https://pnpm.io/workspaces). This allows us to maintain the whole ecosystem keep it up-to-date and consistent.

We do our best to keep the master branch as clean as possible, with tests passing at all times. However, the master branch can move faster than the release cycle. Therefore check the [releases on npm](https://www.npmjs.com/package/moysklad-ts) so that you are always up-to-date with the latest stable version.
