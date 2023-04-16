import { Model, Column, Table, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'product_variants',
  timestamps: false,
})
class ProductVariant extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  public id!: number;

  @Column(DataType.STRING)
  public name!: string;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  public created_at!: Date;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  public updated_at!: Date;
}

export default ProductVariant;
