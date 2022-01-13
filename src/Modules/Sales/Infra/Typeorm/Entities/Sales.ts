import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('sales')
class Sales {
  @PrimaryColumn()
  id: string;

  @Column()
  code_saleFK: string;

  @Column()
  total: number;

  @Column()
  consumer: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Sales };
