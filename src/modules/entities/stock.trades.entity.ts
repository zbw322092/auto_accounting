import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class StockTrades {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  public id: string;

  @Column({ type: 'varchar', length: 20 })
  public trade_date: string;

  @Column({ type: 'varchar', length: 50 })
  public stock_code: string;

  @Column({ type: 'varchar', length: 200 })
  public stock_name: string;

  @Column({ type: 'varchar', length: 50 })
  public trade_type: string;

  @Column({ type: 'int' })
  public trade_amt: number;

  @Column({ type: 'double' })
  public trade_price: number;

  @Column({ type: 'double' })
  public trade_total_price: number;

  @Column({ type: 'double' })
  public happened_total_price: number;

  @Column({ type: 'double' })
  public rest_total_price: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  public declare_code: string;

  @Column({ type: 'varchar', length: 50 })
  public shareholder_code: string;

  @Column({ type: 'varchar', length: 50 })
  public seat_code: string;

  @Column({ type: 'varchar', length: 50 })
  public delegate_code: string;

  @Column({ type: 'varchar', length: 50 })
  public deal_code: string;

  @Column({ type: 'int' })
  public stock_amt: number;

  @Column({ type: 'double' })
  public broker_commission: number;

  @Column({ type: 'double' })
  public stamp_duty: number;

  @Column({ type: 'double' })
  public exchange_fee: number;

  @Column({ type: 'double' })
  public transfer_ownership_fee: number;

  @Column({ type: 'double' })
  public other_fee: number;

  @Column({ type: 'double' })
  public delegate_fee: number;

  @Column({ type: 'text' })
  public remark: string;
}