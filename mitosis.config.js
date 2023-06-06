/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
    files: 'src/**',
    targets: ['vue3', 'react', 'angular'],
    options: {
        react: {
            stateType: "mobx"
        },
        angular: {
            typescript: true
        }
    },
    plugins: ['@builder.io/mitosis'],
    extends: [
        // Use this approach for our recommended rules configuration
        'plugin:@builder.io/mitosis/recommended',
    ],
    rules: {
        // Use this to configure rules individually
        '@builder.io/mitosis/css-no-vars': 'error',
    },
};