// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true
    },
    "extends": [
        '@tencent/eslint-config-tencent',
        'plugin:vue/essential',
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    globals: {
        describe: true,
        it: true,
        expect: true,
        jest: true,
        beforeEach: true,
    },
    // add your custom rules here
    rules: {
        "comma-dangle": ["error", "never"],
        'lines-around-comment': [
            'error',
            {
                'beforeLineComment': true,
                'allowClassStart': false
            }
        ],
        // allow async-await
        'generator-star-spacing': 'off',
        'newline-before-return': 'error',
        'padded-blocks': 'off',
        'indent': [1, 4],
        'no-tabs': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
}
