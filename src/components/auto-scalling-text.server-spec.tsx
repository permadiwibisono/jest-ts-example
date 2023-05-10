import ReactDOMServer from "react-dom/server";
import AutoScalingText from "./auto-scaling-text";

it("should renders server side properly", () => {
  ReactDOMServer.renderToString(<AutoScalingText />);
});
