import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class OutputFlowAnalyse {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  public id: string;

  @Column({ type: 'varchar', length: 50 })
  public record_name: string;

  @Column({ type: 'int' })
  public record_index: number;

  @Column({ type: 'varchar', length: 5 })
  public direction: string;

  @Column({ type: 'varchar', length: 10 })
  public analyse_currency: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  public original_currency: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  public org_domestic_currency: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  public group_domestic_currency?: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  public council_domestic_currency?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  public inner_unit?: string;

  @Column({ type: 'varchar', length: 200 })
  public currency_flow_name: string;

  @Column({ type: 'varchar', length: 50 })
  public currency_flow_code: string;
}