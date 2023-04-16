import { Model, Column, Table, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

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

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  public created_at!: Date;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  public updated_at!: Date;
}

export default Discount;
