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

## Roadmap
### Core features
- ✅ API Client
- ✅ One-level expand
- ⭕ Nested expand
- ⭕ [Filtering](https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-fil-traciq-wyborki-s-pomosch-u-parametra-filter)
- ⭕ [Sorting](https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-sortirowka-ob-ektow)
- ⭕ [Named filters](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-sohranennye-fil-try-poluchit-fil-tr-po-id)
- ⭕ [Attributes](https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-rabota-s-dopolnitel-nymi-polqmi)
- ⭕ [Search](https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-kontextnyj-poisk)
- ⭕ [Async tasks](https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-asinhronnyj-obmen)

### Endpoints
- ⭕ [Assortment](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-assortiment)
- ⭕ [Bonus transaction](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-bonusnaq-operaciq)
- ⭕ [Bonus program](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-bonusnaq-programma)
- ⭕ [Currency](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-valuta)
- ⭕ [Webhook](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-vebhuki)
- ⭕ [Stock webhook](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-vebhuk-na-izmenenie-ostatkow)
- ⭕ [Processing plan folder](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-gruppa-tehkart)
- ⭕ [Product folder](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-gruppa-towarow)
- ⭕ [Contract](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-dogowor)
- ⭕ [UOM](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-edinica-izmereniq)
- ⭕ [Task](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-zadacha)
- ⭕ [Sales channel](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-kanal-prodazh)
- ⭕ [Cashier](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-kassir)
- ⭕ [Bundle](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-komplekt)
- ⭕ [Counterparty](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-kontragent)
- ⭕ [Variant](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-modifikaciq)
- ⭕ [Company settings](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-nastrojki-kompanii)
- ⭕ [User settings](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-nastrojki-pol-zowatelq)
- ⭕ [Group](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-otdel)
- ⭕ [Subscription](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-podpiska-kompanii)
- ⭕ [Role](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-pol-zowatel-skie-roli)
- ⭕ [Custom entity](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-pol-zowatel-skij-sprawochnik-pol-zowatel-skie-sprawochniki)
- ⭕ [Project](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-proekt)
- ⭕ [Region](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-region)
- ⭕ [Consignment](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-seriq)
- ⭕ [Discount](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-skidki)
- ⭕ [Store](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-sklad)
- ⭕ [Employee](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-sotrudnik)
- ⭕ [Named filter](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-sohranennye-fil-try)
- ⭕ [Tax rate](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-stawka-nds)
- ⭕ [Expense item](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-stat-q-rashodow)
- ⭕ [Country](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-strana)
- ⭕ [Processing plan](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-tehkarta)
- ⭕ [Processing process](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-tehprocess)
- ⭕ [Price type](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-tipy-cen)
- ⭕ [Product](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-towar)
- ⭕ [Retail store](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-tochka-prodazh)
- ⭕ [Service](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-usluga)
- ⭕ [Variant's characheristic](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-harakteristiki-modifikacij)
- ⭕ [Embedded template](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-shablon-pechatnoj-formy)
- ⭕ [Organization](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-jurlico)
- ⭕ [Processing stage](https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-jetap-proizwodstwa)
