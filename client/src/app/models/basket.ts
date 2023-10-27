export interface Basket {
    id: number;
    userId: string;
    items: BasketItem[];
  }
  
  export interface BasketItem {
    productId: number;
    name: string;
    pictureUrl: string;
    price: number;
    quantity: number;
    brand: string;
    type: string;
  }