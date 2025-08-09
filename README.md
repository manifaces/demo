# demo

Моно-репозиторий, содержащий примеры различных интерфейсов и небольших приложений. Создан в демонстрационных целях.

- [`dashboard`](packages/dashboard) (`d:`) – мини-апп с графиками на React (Vite).
- [`@demo/eslint-plugin-import-paths`](packages/lib/eslint-plugin-import-paths) (`ip:`) – доработанный форк [одноименного плагина](https://www.npmjs.com/package/eslint-plugin-no-relative-import-paths) для ESLint, правильно исправляет импорты на абсолютные и относительные.

Детальная информация по конкретным пакетам представлена в их собственных `README.md`.

## Разработка

Здесь используются (и уже настроены) современная версия [Yarn 2+](https://yarnpkg.com/getting-started/migration) и [Yarn Workspaces](https://yarnpkg.com/features/workspaces) –
достаточно один раз выполнить команду **`yarn install`** из корня репозитория,
чтобы установить зависимости сразу для всех входящих в него JS-пакетов, используя один общий `yarn.lock`.

### Команды

Yarn позволяет контролировать отдельные пакеты (workspaces) прямо из корня моно-репозитория.
Например, можно использовать команду **`yarn workspace new-project-service dev`**
(или даже просто **`yarn s:dev`** – см. [Yarn Global Scripts](https://yarnpkg.com/features/workspaces#global-scripts))
для запуска конкретного сервиса.
