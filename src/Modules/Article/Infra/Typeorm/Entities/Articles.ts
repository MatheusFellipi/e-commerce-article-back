import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { User } from '@Modules/Accounts/Infra/typeorm/Entities/Users';

@Entity('articles')
class Articles {
  @PrimaryColumn()
  id: string;

  @Column('varchar')
  title: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;

  @Column()
  amount: number;

  @Column()
  themes: string;

  @Column()
  text: string;

  @Column()
  img_url: string;

  @Column()
  isDeleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Articles };
