import { IArticlesRepository } from '@Modules/Article/Repositories/IArticlesRepository';
import { Utility } from '@Shared/Utils/Utility';
import { inject, injectable } from 'tsyringe';

type ArticleFormatted = {
  id: string;
  title: string;
  user_id: string;
  amount: number;
  themes: string[];
  img_url: string;
  created_at: Date;
  update_at: Date;
};

type GetThemes = {
  themes: string;
  total: number;
};

interface IReturnDash {
  listArticle: ArticleFormatted[];
  themes: GetThemes[];
}

interface IRequest {
  id: string;
}

@injectable()
export class DashboardUsersUseCase {
  constructor(
    @inject('ArticlesRepository')
    private repository: IArticlesRepository
  ) {}

  async execute({ id }: IRequest): Promise<IReturnDash> {
    const listArticle = await this.repository.FindByIdUser(id);
    const listArticleFormatted = listArticle.map((item) => {
      return Utility.FormattedArticlesDashEHome(item);
    });
    const themesPublished = await Utility.GetTheme(listArticle);
    return {
      listArticle: listArticleFormatted,
      themes: themesPublished,
    };
  }
}
