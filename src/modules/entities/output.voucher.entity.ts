import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OutputVoucher {
  @PrimaryGeneratedColumn({ type: 'int' })
  public record_index: number;

  @Column({ type: 'varchar', length: 50 })
  public id: string;

  @Column({ type: 'varchar', length: 50 })
  public record_name: string;

  @Column({ type: 'varchar', length: 100 })
  public account_book: string;

  @Column({ type: 'varchar', length: 100 })
  public voucher_type: string;

  @Column({ type: 'varchar', length: 100 })
  public voucher_code: string;

  @Column({ type: 'smallint' })
  public attached_documents: number;

  @Column({ type: 'varchar', length: 100 })
  public document_maker_code: number;

  @Column({ type: 'date' })
  public document_make_date: string;

  @Column({ type: 'varchar', length: 300 })
  public abstract: string;

  @Column({ type: 'varchar', length: 100 })
  public classification_code: string;

  @Column({ type: 'varchar', length: 10 })
  public currency: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  public original_currency_debit?: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  public domestic_currency_debit?: number;

  @Column({ type: 'varchar', length: 50 })
  public business_unit_code: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  public original_currency_credit?: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  public domestic_currency_credit?: number;

  @Column({ type: 'date' })
  public bussiness_date: string;

  @Column({ type: 'varchar', nullable: true })
  public assist_accounting?: string;
}