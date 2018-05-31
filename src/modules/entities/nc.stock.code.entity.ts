import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class NcStockCode {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  public id: string;

  @Column({ type: 'varchar', length: 200 })
  public org_name: string;

  // 档案编码
  @Column({ type: 'varchar', length: 50 })
  public archive_code: string;

  @Column({ type: 'varchar', length: 100 })
  public archive_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  public abbreviation: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  public memory_code: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  public parent_archive_name: string;

  @Column({ type: 'varchar', nullable: true })
  public remark: string;
}