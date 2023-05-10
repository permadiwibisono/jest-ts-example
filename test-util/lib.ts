import { render as rtlRender } from "@testing-library/react";
import * as themes from "../src/themes";
import Wrapper from "./wrapper";

function render(ui: React.ReactElement, { theme = themes.dark, ...options } = {}) {
  const wrapper = Wrapper(theme);
  return rtlRender(ui, { wrapper, ...options });
}

export * from "@testing-library/react";
// override the built-in render with our own
export { render };
