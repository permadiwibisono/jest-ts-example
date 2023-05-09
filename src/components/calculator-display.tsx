import AutoScalingText from "./auto-scaling-text";
import {getFormattedValue} from "../utils";

function CalculatorDisplay({value, ...props}: {value: string}) {
  const formattedValue = getFormattedValue(value, typeof window === "undefined" ? "en-US" : window.navigator.language);

  return (
    <div
      {...props}
      css={{
        position: "relative",
        color: "white",
        background: "#1c191c",
        lineHeight: "130px",
        fontSize: "6em",
        flex: "1"
      }}
    >
      <AutoScalingText>{formattedValue}</AutoScalingText>
    </div>
  );
}

export default CalculatorDisplay;
