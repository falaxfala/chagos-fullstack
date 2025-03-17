import { describe } from "@jest/globals";
import { cx } from "../style";

describe("cx", () => {
  test("should return correct class name", () => {
    expect(cx("a", "b")).toBe("a b");
  });

  test("should replace overlapping class names", () => {
    expect(cx("bg-red", "bg-blue", "bg-green")).toBe("bg-green");
  });

  test("should handle conditional class names", () => {
    expect(cx("a", "b", true && "c", false && "d")).toBe("a b c");
  });
});
