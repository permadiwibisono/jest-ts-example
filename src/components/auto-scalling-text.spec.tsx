import { render, screen } from "@test-util/lib";
import AutoScalingText from "./auto-scaling-text";

it("should renders properly", () => {
  const { container } = render(<AutoScalingText />);
  expect(screen.getByTestId("total")).toHaveClass("autoScalingText");
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="autoScalingText"
        data-testid="total"
        style="transform: scale(1,1);"
      />
    </div>
  `);
});

it("should renders with children properly", () => {
  render(<AutoScalingText>123</AutoScalingText>);
  expect(screen.getByTestId("total")).toHaveTextContent("123");
});
