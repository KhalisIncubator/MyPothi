module.exports = {
    root: true,
    env: {
        'react-native/react-native': true,
    },
    extends: [
        'airbnb',
        'plugin:react-native/all',
        'plugin:@typescript-eslint/recommended',
        'prettier/react',
        'prettier/@typescript-eslint',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['react', 'react-native', "react-hooks"],
    settings: {
        'import/resolver': {
            typescript: {},
            'babel-plugin-root-import': {
                rootPathSuffix: 'app',
                rootPathPrefix: '~',
            },
            node: {
                extensions: ['.js', '.jsx', 'ts', '.tsx'],
            },
        },
    },
    rules: {
        'max-len': ['error', {code: 150}],
        'space-in-parens': ['error', 'always'],
        'array-bracket-spacing': ['error', 'always'],
        'object-curly-spacing': ['error', 'always'],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        'import/extensions': ['error', 'never'],
        'global-require': 0,
        'linebreak-style': [2, 'unix'],
        'prefer-const': 0,
        'no-console': [
            'warn',
            {
                allow: ['warn', 'error', 'log', 'info', 'disableYellowBox'],
            },
        ],
        'no-param-reassign': ['error', { props: false }],
        'no-restricted-globals': 0,
        'no-unused-vars': 0,
        'no-use-before-define': 0,
        'no-underscore-dangle': 0,
        'no-useless-constructor': 0,
        'no-unused-expressions': 0,
        'no-plusplus': 0,
        'no-nested-ternary': 0,
        'lines-between-class-members': [
            1,
            'always',
            {
                exceptAfterSingleLine: true,
            },
        ],
        'prefer-destructuring': [
            2,
            {
                array: true,
                object: true,
            },
        ],
        'max-classes-per-file': 0,
        'import/prefer-default-export': 0,
        'react/prefer-stateless-function': 0,
        'react/destructuring-assignment': 0,
        'react/prop-types': 0,
        'react/react-in-jsx-scope': 0,
        'react/jsx-props-no-spreading': 0,
        'react/jsx-filename-extension': [
            2,
            {
                extensions: ['.jsx', '.tsx'],
            },
        ],
        'jsx-a11y/accessible-emoji': 0,
        'react/static-property-placement': 0,
        'react-native/no-color-literals': 0,
        'react-native/no-raw-text': 0,
        'react-native/no-inline-styles': 0,
        'react-native/split-platform-components': 0,
        '@typescript-eslint/explicit-member-accessibility': [
            2,
            { accessibility: 'no-public' },
        ],
        '@typescript-eslint/no-empty-interface': 1,
        '@typescript-eslint/explicit-function-return-type': [
            0,
            {
                allowExpressions: true,
                allowTypedFunctionExpressions: true,
            },
        ],
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-use-before-define': [
            2,
            {
                functions: true,
                classes: true,
                variables: false,
            },
        ],
        '@typescript-eslint/no-unused-vars': [1, { args: 'none' }],
        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/ban-ts-ignore': 0,
    },
};
