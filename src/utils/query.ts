export const parseQuery = (query?: object) => {
  if (!query) {
    return "";
  }
  const params = new URLSearchParams();
  Object.keys(query).forEach((key) => {
    const value = query[key as keyof typeof query];
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });

  const paramsStringified = params.toString();
  return paramsStringified ? `?${paramsStringified}` : "";
};
