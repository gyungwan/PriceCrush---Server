export interface AuctionInterface {
  id: string;
  user: string;
  product: string;
  price: number;
  create_dt: Date;
  update_dt: Date;
}

export interface Bid {
  id: number;
  amount: number;
  bidderName: string;
}
