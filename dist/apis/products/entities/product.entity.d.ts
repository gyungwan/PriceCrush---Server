import { Auction } from 'src/apis/auction/entities/auction.entity';
import { ProductCategory } from 'src/apis/product-category/entities/product-category.entity';
import { ProductImage } from 'src/apis/productImage/entities/productImage.entity';
import { User } from 'src/apis/users/entities/user.entity';
declare enum ProductStatus {
    CANCEL = -1,
    WAITING = 0,
    SELLING = 1,
    SOLD_OUT = 2
}
export declare class Product {
    id: string;
    name: string;
    start_price: number;
    desc: string;
    start_date: Date;
    end_date: Date;
    status: ProductStatus;
    deletedAt: Date;
    productCategory: ProductCategory;
    user: User;
    productImage: ProductImage[];
    auction: Auction;
}
export {};
