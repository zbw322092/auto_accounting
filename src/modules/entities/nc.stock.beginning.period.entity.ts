import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class NcStockBeginningPeriod {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  public id: string;

  @Column({ type: 'varchar', length: 200 })
  public finance_product_name: string;

  @Column({ type: 'varchar', length: 100 })
  public direction: string;

  @Column({ type: 'double', nullable: true })
  public begin_period_cost: number;

  @Column({ type: 'double', nullable: true })
  public begin_period_diff: number;
}