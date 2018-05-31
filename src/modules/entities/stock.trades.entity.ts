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

  // 成交数量
  @Column({ type: 'int' })
  public trade_amt: number;

  @Column({ type: 'decimal', precision: 11, scale: 4 })
  public trade_price: number;

  // 成交金额
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  public trade_total_price: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  public happened_total_price: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
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

  @Column({ type: 'decimal', precision: 9, scale: 2 })
  public broker_commission: number;

  @Column({ type: 'decimal', precision: 9, scale: 2 })
  public stamp_duty: number;

  @Column({ type: 'decimal', precision: 9, scale: 2 })
  public exchange_fee: number;

  @Column({ type: 'decimal', precision: 9, scale: 2 })
  public transfer_ownership_fee: number;

  @Column({ type: 'decimal', precision: 9, scale: 2 })
  public other_fee: number;

  @Column({ type: 'decimal', precision: 9, scale: 2 })
  public delegate_fee: number;

  @Column({ type: 'text' })
  public remark: string;
}