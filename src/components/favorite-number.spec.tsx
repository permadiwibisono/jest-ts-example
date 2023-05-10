import { render, screen, userEvent } from "@test-util/lib";
import { FavoriteNumber } from "./favorite-number";

it("should render with valid value", async () => {
  render(<FavoriteNumber />);
  const input = screen.getByLabelText(/favorite number/i);
  await userEvent.type(input, "5");
  expect(screen.queryByRole("alert")).toBeNull();
});

it("should display error message when entering minimum value", async () => {
  render(<FavoriteNumber min={2} max={5} />);
  const input = screen.getByLabelText(/favorite number/i);
  await userEvent.type(input, "1");
  expect(screen.queryByRole("alert")).toHaveTextContent(/the number is invalid/i);
});

it("should display error message when entering maximum value", async () => {
  render(<FavoriteNumber min={2} max={5} />);
  const input = screen.getByLabelText(/favorite number/i);
  await userEvent.type(input, "10");
  expect(screen.queryByRole("alert")).toHaveTextContent(/the number is invalid/i);
});

it("should display error message when entering invalid value", async () => {
  const { rerender } = render(<FavoriteNumber />);
  const input = screen.getByLabelText(/favorite number/i);
  await userEvent.type(input, "10");
  expect(screen.getByRole("alert")).toHaveTextContent(/the number is invalid/i);
  rerender(<FavoriteNumber max={10} />);
  expect(screen.queryByRole("alert")).toBeNull();
});
