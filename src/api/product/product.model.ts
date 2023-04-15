import { Model, Column, Table, HasOne, HasMany, PrimaryKey, AutoIncrement, DataType, ForeignKey, AllowNull } from 'sequelize-typescript';
import ProductCategory from '../product-category/product-category.model';
import Discount from '../discount/discount.model';
import Shipping from '../shipping/shipping.model';
import ProductShipping from '../product-shipping/product-shipping.model';
import ProductImage from '../product-image/product-image.model';

@Table({
  tableName: 'products',
  timestamps: false,
})
class Product extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  public id!: number;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  public name!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  public content!: string;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  public sku!: string;

  @AllowNull(false)
  @Column(DataType.FLOAT(10, 2))
  public price!: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public stock!: number;

  @ForeignKey(() => ProductCategory)
  @AllowNull(false)
  @Column(DataType.INTEGER.UNSIGNED)
  public category_id!: number;

  @ForeignKey(() => Discount) 
  @AllowNull(false)
  @Column(DataType.INTEGER.UNSIGNED)
  public discount_id!: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  public status!: boolean;

  @HasMany(() => ProductImage)
  public images!: ProductImage[];

  // @AllowNull(true)
  // @ForeignKey(() => Shipping)
  // @Column(DataType.INTEGER)
  // public shipping_id!: number;

  @HasOne(() => ProductShipping)
  public readonly productShipping!: ProductShipping;

  @Column(DataType.DATE)
  public readonly created_at!: Date;

  @Column(DataType.DATE)
  public readonly updated_at!: Date;
}

export default Product;
