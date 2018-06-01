import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OutputVoucher {
  @PrimaryGeneratedColumn({ type: 'int' })
  public record_index: number;

  @Column({ type: 'varchar', length: 50 })
  public id: string;

  // 给8条固定记录分别分配的名称
  @Column({ type: 'varchar', length: 50 })
  public record_name: string;

  // 核算账簿
  @Column({ type: 'varchar', length: 100 })
  public account_book: string;

  @Column({ type: 'varchar', length: 100 })
  public voucher_type: string;

  @Column({ type: 'varchar', length: 100 })
  public voucher_code: string;

  @Column({ type: 'smallint' })
  public attached_documents: number;

  @Column({ type: 'varchar', length: 100 })
  public document_maker_code: string;

  @Column({ type: 'varchar', length: 50 })
  public document_make_date: string;

  @Column({ type: 'varchar', length: 300 })
  public abstract: string;

  // 科目编码
  @Column({ type: 'varchar', length: 100 })
  public account_code: string;

  @Column({ type: 'varchar', length: 10 })
  public currency: string;

  // 原币借方金额
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  public original_currency_debit?: number;

  // 本币借方金额
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  public domestic_currency_debit?: number;

  @Column({ type: 'varchar', length: 50 })
  public business_unit_code: string;

  // 原币贷方金额
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  public original_currency_credit?: number;

  // 本币贷方金额
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  public domestic_currency_credit?: number;

  @Column({ type: 'varchar', length: 50 })
  public bussiness_date: string;

  @Column({ type: 'varchar', nullable: true })
  public assist_accounting?: string;
}