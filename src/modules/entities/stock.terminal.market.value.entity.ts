import { PrimaryColumn, Entity, Column } from 'typeorm';

@Entity()
export class StockTerminalMarketValue {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  public id: string;

  @Column({ type: 'varchar', length: 200 })
  public stock_name: string;

  @Column({ type: 'double' })
  public rest_amt: number;

  @Column({ type: 'double' })
  public rest_market_value: number;
}