import ProductVariantOption from '../product-variant-option/product-variant-option.model';
import Product from '../product/product.model';
import { Model, Column, Table, PrimaryKey, AutoIncrement, DataType, ForeignKey, AllowNull } from 'sequelize-typescript';

@Table({
  tableName: 'product_variant_option_prices',
  timestamps: false,
})
class ProductVariantOptionPrice extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  public id!: number;

  @ForeignKey(() => Product)
  @AllowNull(false)
  @Column(DataType.INTEGER.UNSIGNED)
  public product_id!: number;

  @ForeignKey(() => ProductVariantOption)
  @AllowNull(false)
  @Column(DataType.INTEGER.UNSIGNED)
  public product_variant_option_id!: number;

  @Column(DataType.NUMBER)
  public price!: number;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  public created_at!: Date;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  public updated_at!: Date;
}

export default ProductVariantOptionPrice;
