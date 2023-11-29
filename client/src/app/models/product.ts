export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    quantityInStock: number;
    type?: string;
    brand: string;
    // not yet implemented:
    rating?: number;
    numReviews?: number;
    sellerId?: number;
    tag?: string[];
}

export interface ProductParams {
    orderBy: string;
    brands?: string;
    types?: string;
    pageNumber: number;
    pageSize: number;
}