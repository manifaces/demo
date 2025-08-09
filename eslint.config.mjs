import eslintPluginImportPaths from '@demo/eslint-plugin-import-paths';
import eslintJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import typescriptEslint from 'typescript-eslint';

const frontImportTypes = ['components', 'features', 'hooks', 'routes', 'store', 'utils'];
const frontPackages = ['demo'];
const frontFiles = frontPackages.map((pkg) => `packages/${pkg}/**/*.{ts,tsx}`);

export default [
  // global ignores
  { ignores: ['**/.*', 'packages/**/dist/*'] },

  // FRONT: typescript-eslint
  { ...eslintJs.configs.recommended, files: frontFiles },
  ...typescriptEslint.configs.strictTypeChecked.map((config) => ({ ...config, files: frontFiles })),
  ...typescriptEslint.configs.stylisticTypeChecked.map((config) => ({ ...config, files: frontFiles })),
  { files: frontFiles, languageOptions: { parserOptions: { ecmaVersion: 'latest', projectService: true } } },

  // FRONT: eslint-plugin-react
  { ...eslintPluginReact.configs.flat.recommended, files: frontFiles },
  { ...eslintPluginReact.configs.flat['jsx-runtime'], files: frontFiles },
  // если не указать версию, то eslint-plugin-react показывает warning
  { files: frontFiles, settings: { react: { version: 'detect' } } },

  {
    // FRONT: custom rules
    files: frontFiles,
    plugins: {
      'react-hooks': eslintPluginReactHooks,
      'react-refresh': eslintPluginReactRefresh,
      import: eslintPluginImport
    },
    rules: {
      'no-irregular-whitespace': [1, { skipJSXText: true }],
      // try { ... } catch (err) { // do nothing }
      '@typescript-eslint/no-unused-vars': [2, { caughtErrors: 'none' }],
      // !roleChanged && timeoutId && clearTimeout(timeoutId)
      '@typescript-eslint/no-unused-expressions': [2, { allowShortCircuit: true }],
      // function useAuthFetch<D>(endpoint: string, options?: { method?: string; body?: string; skip?: boolean }) {
      '@typescript-eslint/no-unnecessary-type-parameters': 0,
      // мешает при передаче promise-функций в качестве html-хендлеров и колбэков
      '@typescript-eslint/no-misused-promises': [2, { checksVoidReturn: { attributes: false, arguments: false } }],
      ...eslintPluginReactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [1, { allowConstantExport: true }],
      'import/order': [
        1,
        {
          'newlines-between': 'never',
          alphabetize: { order: 'asc', caseInsensitive: true },
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
          pathGroupsExcludedImportTypes: frontImportTypes,
          pathGroups: [
            { pattern: 'react', group: 'external', position: 'before' },
            // внутренние библиотеки после внешних
            { pattern: '@demo/**', group: 'external', position: 'after' },
            // импорт SCSS-модулей всегда в самом низу
            { pattern: './*.module.scss', group: 'sibling', position: 'after' },
            // отделяет внутренние импорты от внешних
            ...frontImportTypes.map((frontImportType) => ({
              pattern: `${frontImportType}/**/*`,
              group: 'internal'
            }))
          ]
        }
      ]
    }
  },
  {
    // FRONT: @demo/eslint-plugin-import-paths
    files: frontFiles,
    ignores: ['packages/lib/*'],
    plugins: { 'import-paths': eslintPluginImportPaths },
    rules: { 'import-paths/import-paths': ['warn', { rootPaths: frontImportTypes }] }
  },

  // global prettier
  eslintConfigPrettier
];
