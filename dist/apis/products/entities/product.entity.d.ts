import { Auction } from 'src/apis/auction/entities/auction.entity';
import { ProductCategory } from 'src/apis/product-category/entities/product-category.entity';
import { ProductImage } from 'src/apis/productImage/entities/productImage.entity';
import { User } from 'src/apis/users/entities/user.entity';
export declare class Product {
    id: string;
    name: string;
    start_price: number;
    desc: string;
    start_date: Date;
    end_date: Date;
    deletedAt: Date;
    productCategory: ProductCategory;
    user: User;
    productImage: ProductImage;
    auction: Auction;
}
