/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
    files: 'src/components/**',
    targets: ['vue3', 'react', 'angular'],
    options: {
        prettier: true,
        react: {
            stateType: "useState",
            stylesType: "styled-jsx",
            prettier: true,
        },
        angular: {
            typescript: true,
            prettier: true,
            standalone: true
        },
        vue3: {
            prettier: true,
            typescript: true,
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