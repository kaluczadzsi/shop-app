module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['airbnb', 'airbnb/hooks', 'airbnb-typescript', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
    parser: '@typescript-eslint/parser'
  },
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'vite.config.ts',
    'vite-env.d.ts',
    'interfaces',
    'hooks.ts',
    'src/mocks/node.tsx'
  ],
  plugins: ['react-refresh'],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'react-hooks/exhaustive-deps': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true, allowExportNames: ['loader'] }],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'arrow-body-style': 'off',
    'react/jsx-props-no-spreading': 'off',

    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['function-declaration', 'arrow-function'],
        unnamedComponents: 'arrow-function'
      }
    ]
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
}
