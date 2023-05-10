import ReactDOMServer from "react-dom/server";
import AutoScalingText from "./auto-scaling-text";

test("it renders server side properly", () => {
  ReactDOMServer.renderToString(<AutoScalingText />);
});
