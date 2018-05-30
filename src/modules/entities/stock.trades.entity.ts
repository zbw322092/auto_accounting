import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class StockTrades {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ type: 'varchar', length: 20 })
  trade_date: string;

  @Column({ type: 'varchar', length: 50 })
  stock_code: string;

  @Column({ type: 'varchar', length: 200 })
  stock_name: string;

  @Column({ type: 'varchar', length: 50 })
  trade_type: string;

  @Column({ type: 'int' })
  trade_amt: number;

  @Column({ type: 'double' })
  trade_price: number;

  @Column({ type: 'double' })
  trade_total_price: number;

  @Column({ type: 'double' })
  happened_total_price: number;

  @Column({ type: 'double' })
  rest_total_price: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  declare_code: string;

  @Column({ type: 'varchar', length: 50 })
  shareholder_code: string;

  @Column({ type: 'varchar', length: 50 })
  seat_code: string;

  @Column({ type: 'varchar', length: 50 })
  delegate_code: string;

  @Column({ type: 'varchar', length: 50 })
  deal_code: string;

  @Column({ type: 'int' })
  stock_amt: number;

  @Column({ type: 'double' })
  broker_commission: number;

  @Column({ type: 'double' })
  stamp_duty: number;

  @Column({ type: 'double' })
  exchange_fee: number;

  @Column({ type: 'double' })
  transfer_ownership_fee: number;

  @Column({ type: 'double' })
  other_fee: number;

  @Column({ type: 'double' })
  delegate_fee: number;

  @Column({ type: 'text' })
  remark: string;
}