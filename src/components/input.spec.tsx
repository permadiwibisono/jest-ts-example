import { render, screen, userEvent } from "@test-util/lib";
import { Input } from "./input";

it("should renders", async () => {
  render(<Input />);
  const input = screen.getByLabelText(/email/i);
  await userEvent.type(input, "mbapewe@gmail.com");
  expect(input).toHaveValue("mbapewe@gmail.com");
});
