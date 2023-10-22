export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    quantityInStock: number;
    type?: string;
    brand: string;
    rating?: number;
    numReviews?: number;
    sellerId?: number;
}