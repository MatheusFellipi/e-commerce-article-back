import { User } from '@Modules/Accounts/Infra/typeorm/Entities/Users';
import { Themes } from '../Infra/Typeorm/Entities/Themes';

interface DTOCreateArticle {
  id?: string;
  user_id: string;

  text: string;
  title: string;
  img_url?: string;
  themes: string[];

  isDeleted?: boolean;
  update_at?: Date;
  created_at?: Date;
}

export { DTOCreateArticle };
