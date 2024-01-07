interface DTOCreateArticle {
  id?: string;
  user_id: string;

  text: string;
  title: string;
  img_url?: string;
  themes: string;
  amount: number;

  isDeleted?: boolean;
  update_at?: Date;
  created_at?: Date;
}

export { DTOCreateArticle };
