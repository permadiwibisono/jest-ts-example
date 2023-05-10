import { render } from "@test-util/lib";
import CalculatorDisplay from "./calculator-display";
import * as themes from "../themes";

it("should renders", () => {
  const { container } = render(<CalculatorDisplay value="123" />);
  expect(container).toMatchInlineSnapshot(`
    .emotion-0 {
      position: relative;
      line-height: 130px;
      font-size: 6em;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      color: white;
      background: #1c191c;
    }

    <div>
      <div
        class="emotion-0 emotion-1"
      >
        <div
          class="autoScalingText"
          data-testid="total"
          style="transform: scale(1,1);"
        >
          123
        </div>
      </div>
    </div>
  `);
});

it("should renders dark mode", () => {
  const { container } = render(<CalculatorDisplay value="123" />, { theme: themes.dark });
  expect(container).toMatchInlineSnapshot(`
    .emotion-0 {
      position: relative;
      line-height: 130px;
      font-size: 6em;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      color: white;
      background: #1c191c;
    }

    <div>
      <div
        class="emotion-0 emotion-1"
      >
        <div
          class="autoScalingText"
          data-testid="total"
          style="transform: scale(1,1);"
        >
          123
        </div>
      </div>
    </div>
  `);
});

it("should renders light mode", () => {
  const { container } = render(<CalculatorDisplay value="123" />, { theme: themes.light });
  expect(container).toMatchInlineSnapshot(`
    .emotion-0 {
      position: relative;
      line-height: 130px;
      font-size: 6em;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      color: #1c191c;
      background: white;
    }

    <div>
      <div
        class="emotion-0 emotion-1"
      >
        <div
          class="autoScalingText"
          data-testid="total"
          style="transform: scale(1,1);"
        >
          123
        </div>
      </div>
    </div>
  `);
});
