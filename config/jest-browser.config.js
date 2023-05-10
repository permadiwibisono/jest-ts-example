/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  ...require("./jest-common.config"),
  displayName: "browser",
  testEnvironment: "jsdom"
};
