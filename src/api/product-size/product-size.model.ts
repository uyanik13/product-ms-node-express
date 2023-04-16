import Product from '../product/product.model';
import { Model, Column, Table, PrimaryKey, AutoIncrement, DataType, ForeignKey, AllowNull } from 'sequelize-typescript';

@Table({
  tableName: 'product_sizes',
  timestamps: false,
})
class ProductSize extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  public id!: number;

  @ForeignKey(() => Product)
  @AllowNull(false)
  @Column(DataType.INTEGER.UNSIGNED)
  public product_id!: number;

  @Column(DataType.INTEGER.UNSIGNED)
  public width!: number;

  @Column(DataType.INTEGER.UNSIGNED)
  public height!: number;

  @Column(DataType.INTEGER.UNSIGNED)
  public length!: number;

  @Column(DataType.INTEGER.UNSIGNED)
  public weight!: number;

  @Column(DataType.STRING)
  public weight_type!: string;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  public created_at!: Date;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  public updated_at!: Date;
}

export default ProductSize;
