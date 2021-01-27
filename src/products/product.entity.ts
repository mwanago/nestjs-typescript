import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import ProductCategory from '../productCategories/productCategory.entity';
import { CarProperties } from './types/carProperties.interface';
import { BookProperties } from './types/bookProperties.interface';

@Entity()
class Product {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @ManyToOne(() => ProductCategory, (category: ProductCategory) => category.products)
  public category!: ProductCategory;

  @Column({
    type: 'jsonb'
  })
  public properties!: CarProperties | BookProperties;
}

export default Product;