# moysklad-ts
[![npm](https://img.shields.io/npm/v/moysklad-ts)](https://npmjs.com/package/moysklad-ts)
[![npm package minimized gzipped size (select exports)](https://img.shields.io/bundlejs/size/moysklad-ts)](https://bundlejs.com/?q=moysklad-ts)
[![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/MonsterDeveloper/moysklad-ts/publish-to-npm.yml)](https://github.com/MonsterDeveloper/moysklad-ts/actions/workflows/publish-to-npm.yml)
[![GitHub](https://img.shields.io/github/license/MonsterDeveloper/moysklad-ts)](https://github.com/MonsterDeveloper/moysklad-ts/blob/main/LICENSE)

	Данная библиотека находится на стадии альфа-тестирования и ещё не готова к использованию в продакшене.


`moysklad-ts` это полностью типизированный клиент [МойСклад](https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api).

## Использование

### Установка
<img height="18" src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/npm.svg"> npm

```bash
npm i moysklad-ts
```
<details>
  <summary>Другие менеджеры пакетов</summary>

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
</details>

### Пример
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

## Документация

_Coming soon..._

## Доработки
Пожалуйста, прочитайте [contributing guidelines](../../CONTRIBUTING.md) прежде чем начать работу над проектом. Спасибо!

## Лицензия
Проект находится под лицензией [GPL-3.0](../../LICENSE).