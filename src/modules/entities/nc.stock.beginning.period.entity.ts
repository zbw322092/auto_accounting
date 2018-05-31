import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class NcStockBeginningPeriod {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  public id: string;

  @Column({ type: 'varchar', length: 200 })
  public finance_product_name: string;

  @Column({ type: 'varchar', length: 100 })
  public direction: string;

  // 期初成本
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  public begin_period_cost: number;

  // 期初公允
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  public begin_period_diff: number;
}