import { Model, Column, Table, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'product_categories',
  timestamps: false,
})
class ProductCategory extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  public id!: number;

  @Column(DataType.STRING)
  public name!: string;

  @Column(DataType.STRING)
  public desc!: string;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  public created_at!: Date;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  public updated_at!: Date;
}


export default ProductCategory;
