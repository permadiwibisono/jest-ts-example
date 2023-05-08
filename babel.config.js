const isProd = String(process.env.NODE_ENV) === "production";

module.exports = {
  presets: [
    // Runtime automatic with React 17+ allows not importing React
    // in files only using JSX (no state or React methods)
    ["@babel/preset-react", { runtime: "automatic" }],
    ["@babel/env", { modules: false }],
    "@babel/preset-typescript",
    [
      "@emotion/babel-preset-css-prop",
      {
        hoist: isProd,
        sourceMap: !isProd,
        autoLabel: "dev-only",
        labelFormat: "[filename]--[local]",
      },
    ],
  ],
  env: {
    test: {
      presets: [
        // Runtime automatic with React 17+ allows not importing React
        // in files only using JSX (no state or React methods)
        ["@babel/preset-react", { runtime: "automatic" }],
        ["@babel/env", { modules: "commonjs" }],
        "@babel/preset-typescript",
        [
          "@emotion/babel-preset-css-prop",
          {
            hoist: isProd,
            sourceMap: !isProd,
            autoLabel: "dev-only",
            labelFormat: "[filename]--[local]",
          },
        ],
      ],
    },
  },
};
