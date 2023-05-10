/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  ...require("./config/jest-common.config"),
  preset: "ts-jest",
  projects: ["./config/jest-browser.config.js", "./config/jest-server.config.js"]
};
