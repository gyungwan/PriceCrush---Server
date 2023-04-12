export interface AuctionInterface {
    id: string;
    user_id: string;
    prod_id: string;
    price: number;
}
export interface Bid {
    id: number;
    amount: number;
    bidderName: string;
}
