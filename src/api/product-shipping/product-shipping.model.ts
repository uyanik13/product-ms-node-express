import Product from '../product/product.model';
import Shipping from '../shipping/shipping.model';
import { Model, Column, Table, PrimaryKey, AutoIncrement, DataType, ForeignKey, AllowNull } from 'sequelize-typescript';

@Table({
  tableName: 'product_shippings',
  timestamps: false,
})
class ProductShipping extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  public id!: number;

  @ForeignKey(() => Product)
  @AllowNull(false)
  @Column(DataType.INTEGER.UNSIGNED)
  public product_id!: number;

  @ForeignKey(() => Shipping) 
  @AllowNull(false)
  @Column(DataType.INTEGER.UNSIGNED)
  public shipping_id!: number;

  @Column(DataType.DATE)
  public readonly createdAt!: Date;

  @Column(DataType.DATE)
  public readonly updatedAt!: Date;
}

export default ProductShipping;
