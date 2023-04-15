import Product from '../product/product.model';
import { Model, Column, Table, PrimaryKey, AutoIncrement, DataType, ForeignKey } from 'sequelize-typescript';

@Table({
  tableName: 'product_images',
  timestamps: false,
})
class ProductImage extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  public id!: number;

  @Column(DataType.STRING)
  public image_url!: string;

  @Column(DataType.STRING)
  public image_type!: string;

  @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  public product_id!: number;

  @Column(DataType.DATE)
  public readonly createdAt!: Date;

  @Column(DataType.DATE)
  public readonly updatedAt!: Date;
}


export default ProductImage;
