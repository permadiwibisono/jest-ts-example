/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  ...require("./jest-common.config"),
  displayName: "server",
  testEnvironment: "node",
  testMatch: ["**/__server_tests__/**/*.(ts|tsx)", "**/*.server-(spec|test).(ts|tsx)"]
};
