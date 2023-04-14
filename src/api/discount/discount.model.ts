import { Model, Column, Table, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';
import sequelize from '../../config/database';

@Table({
  tableName: 'discounts',
  timestamps: false,
})
class Discount extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  public id!: number;

  @Column(DataType.STRING)
  public name!: string;

  @Column(DataType.STRING)
  public desc!: string;

  @Column(DataType.DECIMAL)
  public discount_percent!: number;

  @Column({ type: DataType.INTEGER, defaultValue: 1 })
  public status!: number;

  @Column(DataType.DATE)
  public readonly createdAt!: Date;

  @Column(DataType.DATE)
  public readonly updatedAt!: Date;
}

export default Discount;
