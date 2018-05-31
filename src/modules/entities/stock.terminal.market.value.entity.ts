import { PrimaryColumn, Entity, Column } from 'typeorm';

@Entity()
export class StockTerminalMarketValue {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  public id: string;

  @Column({ type: 'varchar', length: 200 })
  public stock_name: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  public rest_amt: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  public rest_market_value: number;
}