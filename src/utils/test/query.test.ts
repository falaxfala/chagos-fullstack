import { describe, test } from "@jest/globals";
import { parseQuery } from "../query";

describe("query", () => {
  test("should parse query", () => {
    const query = {
      key1: "value1",
      key2: "value2",
    };

    expect(parseQuery(query)).toEqual("?key1=value1&key2=value2");
  });

  test("should return empty string if query is empty", () => {
    expect(parseQuery()).toEqual("");
  });

  test("should return empty string if query is empty object", () => {
    expect(parseQuery({})).toEqual("");
  });
});
