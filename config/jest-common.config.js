/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  rootDir: path.join(__dirname, ".."),
  moduleNameMapper: {
    // module must come first
    "\\.module\\.css$": "identity-obj-proxy",
    "\\.css$": require.resolve("../test-util/style-mock.ts"),
    "\\.module\\.scss$": "identity-obj-proxy",
    "\\.scss$": require.resolve("../test-util/style-mock.ts"),
    // can also map files that are loaded by webpack with the file-loader
    "@test-util/(.*)": "<rootDir>/test-util/$1"
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  snapshotSerializers: ["@emotion/jest/serializer"]
};
