import { ThemeProvider } from "@emotion/react";
import { Suspense, lazy, useState } from "react";
import * as themes from "./themes";

const Calculator = lazy(() => import("@containers/calculator"));

function App() {
  const [theme, setTheme] = useState("dark");
  return (
    <ThemeProvider theme={theme === "dark" ? themes.dark : themes.light}>
      <Suspense fallback={null}>
        <Calculator />
      </Suspense>
      <div style={{ marginTop: 30 }}>
        <fieldset>
          <legend>Theme</legend>
          <label>
            <input
              onChange={() => setTheme("light")}
              checked={theme === "light"}
              type="radio"
              name="theme"
              value="light"
            />{" "}
            light
          </label>
          <label>
            <input
              onChange={() => setTheme("dark")}
              checked={theme === "dark"}
              type="radio"
              name="theme"
              value="dark"
            />{" "}
            dark
          </label>
        </fieldset>
      </div>
      <div style={{ marginTop: 30, textAlign: "center" }}>
        Calculator component <a href="https://codepen.io/mjijackson/pen/xOzyGX">created</a>
        {" by "}
        <br />
        <a href="https://twitter.com/mjackson">Michael Jackson</a> of{" "}
        <a href="https://reacttraining.com/">React Training</a>
      </div>
    </ThemeProvider>
  );
}

export default App;
