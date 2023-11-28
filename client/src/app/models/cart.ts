export interface Cart {
    id: number;
    userId: string;
    items: CartItem[];
  }
  
  export interface CartItem {
    productId: number;
    name: string;
    pictureUrl: string;
    price: number;
    quantity: number;
    brand: string;
    type: string;
  }