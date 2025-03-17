import { extractProductPrice } from "../product";
import { describe, test, expect } from "@jest/globals";

describe("extractProductPrice", () => {
  test("get correct product price", () => {
    const price = extractProductPrice("$3.20 per tile");
    expect(price).toBe(3.2);
  });

  test("get correct product price without cents", () => {
    const price = extractProductPrice("$3 per tile");
    expect(price).toBe(3);
  });

  test("handle wrong price format", () => {
    expect(() => extractProductPrice("3.20 per tile")).toThrowError(
      "Couldn't extract price from 3.20 per tile"
    );
  });
});
