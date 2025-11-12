export interface Product {
  id: string;
  productName: string;
  category: string;
  price: string; 
  quantity: string; 
  size: string;
  description: string;
  image: string;
  images?: string[]; 
}