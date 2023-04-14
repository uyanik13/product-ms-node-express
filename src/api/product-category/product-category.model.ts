import { Model, Column, Table, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';
import sequelize from '../../config/database';

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

  @Column(DataType.DATE)
  public readonly createdAt!: Date;

  @Column(DataType.DATE)
  public readonly updatedAt!: Date;
}


export default ProductCategory;
