# moysklad-ts
![npm](https://img.shields.io/npm/v/moysklad-ts)
![npm package minimized gzipped size (select exports)](https://img.shields.io/bundlejs/size/moysklad-ts)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/MonsterDeveloper/moysklad-ts/publish-to-npm.yml)
![GitHub](https://img.shields.io/github/license/MonsterDeveloper/moysklad-ts)


`moysklad-ts` is a fully-typed API wrapper for [Moysklad](https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api). This monorepo consists of:
- [moysklad-ts](./packages/moysklad-ts) - the main package
- [docs](./apps/docs) - the documentation [website](https://moysklad-ts.vercel.app/)

## Usage

### Installation
<img height="18" src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/npm.svg"> npm

```bash
npm i moysklad-ts
```

<img height="18" src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/pnpm.svg"> pnpm

```bash
pnpm add moysklad-ts
```

<img height="18" src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/yarn.svg"> Yarn

```bash
yarn add moysklad-ts
```

<img height="18" src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/bun.svg"> bun

```bash
bun add moysklad-ts
```

<img height="18" src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/deno.svg"> Deno

```typescript
import { Moysklad } from "https://esm.sh/moysklad-ts";
```

### Example
```typescript
import { Moysklad, MoyskladApiError } from "moysklad-ts";

const moysklad = new Moysklad({
  auth: {
    token: "123"
  }
});

try {
  const { rows: bonusTransactions } = await moysklad.bonusTransaction.list({
    expand: { bonusProgram: true }
  });
} catch (error) {
  if (error instanceof MoyskladApiError) {
    console.error(error.message, error.code, error.moreInfo);
		return;
  }

	console.error(error);
}
```

## Documentation
The documentation is available [here](https://moysklad-ts.vercel.app/).

## Contributing
Please read the [contributing guidelines](./CONTRIBUTING.md) before submitting a pull request.

## License
This project is licensed under the [GPL-3.0 license](./LICENSE).