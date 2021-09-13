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
  key_theme: string;

  @Column('varchar')
  theme: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  constructor() {
    if (!this.key_theme) {
      this.key_theme = uuidV4();
    }
  }
}

export { Themes };
