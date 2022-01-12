import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SaleItem } from './SaleItem';

@Entity('sales')
class Sales {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => SaleItem)
  @JoinColumn({ name: 'fk_code_sale' })
  SaleItem: SaleItem;

  @Column()
  fk_code_sale: string;

  @Column()
  total: number;

  @Column()
  consumer: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  constructor() {}
}

export { Sales };
