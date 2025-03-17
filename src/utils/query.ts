export const parseQuery = (query?: object) => {
  if (!query) {
    return "";
  }
  return Object.keys(query).reduce((acc, key, index) => {
    const elem = query[key as keyof typeof query];
    if (elem === undefined || elem === null) {
      return acc;
    }

    const prefix = index === 0 ? "?" : "&";
    return `${acc}${prefix}${key}=${elem}`;
  }, "");
};
