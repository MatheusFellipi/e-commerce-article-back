import { Entity, Column, PrimaryColumn, JoinColumn, OneToOne } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Articles } from '@Modules/Article/Infra/Typeorm/Entities/Articles';
import { User } from './Users';

@Entity('itemUserPurchased')
class ItemUserPurchased {
  @PrimaryColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;

  @OneToOne(() => Articles)
  @JoinColumn({ name: 'article_id' })
  article: Articles;

  @Column()
  article_id: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { ItemUserPurchased };
