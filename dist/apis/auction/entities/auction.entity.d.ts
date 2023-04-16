import { Product } from 'src/apis/products/entities/product.entity';
import { User } from 'src/apis/users/entities/user.entity';
export declare class Auction {
    id: string;
    product: Product;
    user: User;
    price: number;
    create_dt: Date;
    update_dt: Date;
}
