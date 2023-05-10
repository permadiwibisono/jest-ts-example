import { getFormattedValue } from "./utils";

it("should formatted value correctly", () => {
  const input = "1234";
  const formatted = getFormattedValue(input);
  expect(formatted).toBe("1,234");
});

it("should formatted decimal value correctly", () => {
  const input = "1003.45";
  const formatted = getFormattedValue(input);
  expect(formatted).toBe("1,003.45");
});
