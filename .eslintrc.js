module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }],

    'import/no-cycle': ['error', { maxDepth: 1 }],
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-restricted-paths': [
      'error',
      {
        basePath: '.',
        zones: [
          {
            target: 'src/shared/domain',
            from: 'src',
            except: ['src/shared/domain/**'],
          },
          {
            target: 'src/shared/infra',
            from: 'src',
            except: ['src/shared/infra/**', 'src/shared/domain/**'],
          },
          {
            target: 'src/*/domain',
            from: 'src',
            except: ['src/shared/domain/**', 'src/*/domain/**'],
          },
          {
            target: 'src/*/application',
            from: 'src',
            except: [
              'src/shared/domain/**',
              'src/*/domain/**',
              'src/*/application/**',
            ],
          },
          {
            target: 'src/*/adapters',
            from: 'src',
            except: [
              'src/shared/domain/**',
              'src/*/domain/**',
              'src/*/application/**',
              'src/*/adapters/**',
            ],
          },
          {
            target: 'src/*/infra',
            from: 'src',
            except: [
              'src/shared/domain/**',
              'src/*/domain/**',
              'src/*/application/**',
              'src/*/adapters/**',
              'src/*/infra/**',
            ],
          },
        ],
      },
    ],
  },
};
