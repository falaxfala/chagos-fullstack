export type Product = {
  _id: string;
  productName: string;
  category: string;
  productImage: string;
  price: string;
  manufacturer: string;
  environmentalPerformance: number;
  dimensions: string;
  weight: string;
  description: string;
  inCart?: boolean;
};
