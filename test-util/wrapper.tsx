import { ThemeProvider } from "@emotion/react";
import * as themes from "../src/themes";

export default function Wrapper(theme = themes.dark) {
  return ({ children }: { children?: React.ReactNode }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  };
}
