import ProductVariant from '../product-variant/product-variant.model';
import Product from '../product/product.model';
import { Model, Column, Table, PrimaryKey, AutoIncrement, DataType, ForeignKey, AllowNull } from 'sequelize-typescript';

@Table({
  tableName: 'product_variant_options',
  timestamps: false,
})
class ProductVariantOption extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  public id!: number;

  @ForeignKey(() => Product)
  @AllowNull(false)
  @Column(DataType.INTEGER.UNSIGNED)
  public product_id!: number;

  @ForeignKey(() => ProductVariant)
  @AllowNull(false)
  @Column(DataType.INTEGER.UNSIGNED)
  public product_variant_id!: number;

  @Column(DataType.STRING)
  public value!: string;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  public created_at!: Date;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  public updated_at!: Date;
}

export default ProductVariantOption;
