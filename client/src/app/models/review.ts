export interface Post {
    id: number;
    title: string;
    content: string;
    pictureUrl: string;
    timebought?: string;
    locationbought?: string;
    price?: number;
    type?: string;
    brand?: string;
    authorId?: number;
    tag?: string[];
    comments?: Comment[];
}