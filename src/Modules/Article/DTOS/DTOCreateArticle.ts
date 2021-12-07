import { User } from '@Modules/Account/Infra/typeorm/Entities/Users';
import { Themes } from '../Infra/Typeorm/Entities/Themes';

interface DTOCreateArticle {
  user_id: string;
  theme_id: string;
  id?: string;

  text: string;
  title: string;
  img_url?: string;

  delete?: boolean;
  update_at?: Date;
  created_at?: Date;
}

export { DTOCreateArticle };
