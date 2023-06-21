module.exports = {
  "moduleFileExtensions": [
    "js",
    "json",
    "vue"
  ],
  transform: {
    '.*\\.js$':'babel-jest',
    ".*\\.(vue)$": "@vue/vue3-jest"
  },
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  testEnvironment: 'jsdom'
}