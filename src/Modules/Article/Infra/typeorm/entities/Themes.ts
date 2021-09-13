import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuidV4 } from 'uuid';

@Entity('themes')
class Themes {
  @PrimaryColumn()
  id: string;

  @Column('varchar')
  theme: string;

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

export { Themes };
