import { inject, injectable } from 'tsyringe';
import { Articles } from '@Modules/Article/Infra/Typeorm/Entities/Articles';
import { IItemUserPurchasedRepository } from '@Modules/Accounts/Repositories/IItemUserPurchasedRepository';
import { Utility } from '@Shared/Utils/Utility';
import { IArticlesRepository } from '@Modules/Article/Repositories/IArticlesRepository';

interface IRequest {
  id: string;
}

type GetThemes = {
  themes: string;
  total: number;
};

interface IReturnDash {
  purchased: Articles[];
  themes: GetThemes[];
}

@injectable()
export class PurchasedUsersUseCase {
  constructor(
    @inject('ItemUserPurchasedRepository')
    private repository: IItemUserPurchasedRepository,
    @inject('ArticlesRepository')
    private __articleRepos: IArticlesRepository
  ) {}

  async execute({ id }: IRequest): Promise<IReturnDash> {
    const listItemsPurchased = await this.repository.findByUserId(id);
    const ids = listItemsPurchased.map((item) => item.article_id);
    const article = await this.__articleRepos.FindByIds(ids);
    const themesPurchased = await Utility.GetTheme(article);
    const list = article.map((item) => ({
      ...item,
      themes: JSON.parse(item.themes),
    }));
    return {
      purchased: list,
      themes: themesPurchased,
    };
  }
}
