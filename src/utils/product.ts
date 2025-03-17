export const extractProductPrice = (price: string): number => {
  const foundPrice = price.match(/\$\d+(\.\d{1,2})?/);
  const priceNumber = foundPrice ? foundPrice[0].replace("$", "") : null;

  if (!priceNumber || isNaN(parseFloat(priceNumber))) {
    throw new Error(`Couldn't extract price from ${price}`);
  }

  return parseFloat(priceNumber);
};
