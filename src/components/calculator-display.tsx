import AutoScalingText from "./auto-scaling-text";
import { getFormattedValue } from "../utils";
import styled from "@emotion/styled";

const DisplayContainer = styled.div(
  {
    position: "relative",
    lineHeight: "130px",
    fontSize: "6em",
    flex: "1"
  },
  ({ theme }) => ({
    color: theme.displayTextColor,
    background: theme.displayBackgroundColor
  })
);

function CalculatorDisplay({ value, ...props }: { value: string }) {
  const formattedValue = getFormattedValue(value, typeof window === "undefined" ? "en-US" : window.navigator.language);

  return (
    <DisplayContainer {...props}>
      <AutoScalingText>{formattedValue}</AutoScalingText>
    </DisplayContainer>
  );
}

export default CalculatorDisplay;
