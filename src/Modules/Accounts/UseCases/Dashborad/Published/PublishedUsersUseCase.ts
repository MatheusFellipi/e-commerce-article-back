import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@Modules/Accounts/Repositories/IUsersRepository';
import { IArticlesRepository } from '@Modules/Article/Repositories/IArticlesRepository';
import { ArticlesRepository } from '@Modules/Article/Infra/Typeorm/Repositories/ArticleRepository';
import { Articles } from '@Modules/Article/Infra/Typeorm/Entities/Articles';
import { Utility } from '@Modules/Accounts/UseCases/Dashborad/Utility';

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
  published: {
    listArticle: ArticleFormatted[];
    count: number;
    themes: GetThemes[];
  };
}

interface IRequest {
  id: string;
}

@injectable()
export class DashboradUsersUseCase {
  private dash: IReturnDash;

  constructor(
    @inject('ArticlesRepository')
    private repository: IArticlesRepository
  ) {}

  async execute({ id }: IRequest): Promise<IReturnDash> {
    const listArticle = await this.repository.FindByIdUser(id);
    const themesPublished = await Utility.GetTheme(listArticle);

    const listArticleFormatted = listArticle.map((item) => {
      return Utility.FormattedArticlesDashEHome(item);
    });

    this.dash = {
      published: {
        listArticle: listArticleFormatted,
        count: listArticle.length,
        themes: themesPublished,
      },
    };
    return this.dash;
  }
}
