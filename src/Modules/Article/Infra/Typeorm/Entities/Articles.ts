import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Themes } from './Themes';
import { v4 as uuidV4 } from 'uuid';
import { User } from '@Modules/Account/Infra/typeorm/Entities/Users';

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

  @ManyToOne(() => Themes)
  @JoinColumn({ name: 'theme_id' })
  themes: Themes;

  @Column()
  theme_id: string;

  @Column('varchar')
  text: string;

  @Column('varchar')
  img_url: string;

  @Column('boolean')
  delete: boolean;

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
