# moysklad-ts
[![npm](https://img.shields.io/npm/v/moysklad-ts)](https://npmjs.com/package/moysklad-ts)
[![npm package minimized gzipped size](https://deno.bundlejs.com/?q=moysklad-ts&badge=detailed&badge-style=for-the-badge)](https://bundlejs.com/?q=moysklad-ts)
[![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/MonsterDeveloper/moysklad-ts/publish-to-npm.yml)](https://github.com/MonsterDeveloper/moysklad-ts/actions/workflows/publish-to-npm.yml)
[![GitHub](https://img.shields.io/github/license/MonsterDeveloper/moysklad-ts)](https://github.com/MonsterDeveloper/moysklad-ts/blob/main/LICENSE)

> ❗ Данная библиотека находится на стадии альфа-тестирования и ещё не готова к использованию в продакшене.


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

Библиотека требует Node.js версии 18 и выше, либо другой соответствующей среды исполнения, в которой доступен [`fetch` API](https://developer.mozilla.org/en-US/docs/Web/API/fetch).

### Пример
```typescript
import { Moysklad } from "moysklad-ts";

const moysklad = new Moysklad({
  auth: {
    token: "123"
  }
});

// Получить контрагента с владельцем
const counterparty = await moysklad.counterparty.get("5427bc76-b95f-11eb-0a80-04bb000cd583", {
  expand: { owner: true }, // результат полностью типизирован
});

// Получить все отгрузки с контрагентом
const demands = await moysklad.demand.all({
  expand: { agent: true },
});

// Получить первую отгрузку контрагента
const demand = await moysklad.demand.first({
  filter: {
    agent: moysklad.client.buildUrl(["entity", "counterparty", "5427bc76-b95f-11eb-0a80-04bb000cd583"]).toString(),
  }, // автокомплит для всех опций запроса
});
```

## Документация

Большинство методов интуитивно понятны и описаны с помощью JSDoc. Так что основной ресурс для изучения API - это [документация МойСклад](https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api).

### Методы
Все методы в классе `Moysklad` разделены на эндпоинты, которые соответствуют разделам API МойСклад (на английском).

Например, чтобы получить всех контрагентов (`counteryparty`) используйте `moysklad.counterparty.all()`. Или чтобы получить входящий платёж (`paymentin`), вызовите `moysklad.paymentIn.get("id")`.

### Утилиты
- `composeDateTime` - создаёт строку с датой в формате МойСклад
- `parseDateTime` - парсит строку с датой из формата МойСклад
- `Moysklad.client.buildUrl` - создаёт URL для запроса к API МойСклад

### Опции инициализации
| Параметр          | По умолчанию                                                                                                      | Описание                                                                                                                                                                                                                                                                         |
|-------------------|-------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `auth`            | —                                                                                                                 | Может быть либо `{ token: string }` для аутентификации по токену, либо `{ login: string, password: string }` для HTTP Basic Auth. (см. [Moysklad Docs](https://github.com/wmakeev/moysklad#%D0%B0%D1%83%D1%82%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F) |
| `baseUrl`         | `"https://api.moysklad.ru/api/remap/1.2"`                                                                         | Базовый URL API МойСклад.                                                                                                                                                                                                                                                        |
| `userAgent`       | `moysklad-ts/${version} (+https://github.com/MonsterDeveloper/moysklad-ts)`, где `{version}`  - версия библиотеки | Содержимое заголовка "User-Agent" при выполнении запроса. Удобно использовать для контроля изменений через API на вкладке "Аудит".                                                                                                                                               |
| `batchGetOptions` | `{ limit: 1000, expandLimit: 100, concurrencyLimit: 3 }`                                                          | Опции для получения всех сущностей из API (метод `.all()`). Устанавливает ограничения на размер запросов с `expand` и без него, а также ограничение на количество одновременных запросов.                                                                                        |


## Доработки
Пожалуйста, прочитайте [contributing guidelines](../../CONTRIBUTING.md) прежде чем начать работу над проектом. Спасибо!

## Лицензия
Проект находится под лицензией [GPL-3.0](../../LICENSE).