export interface Product {
  id: number;
  name: string;
  description: string;
  img_url: string;
  price: number;
  availability: number;
  shopId: number;
}
export interface CartItem{
  // pid:number,
  // qntt:number,
  product:Product,
  quantity:number
}