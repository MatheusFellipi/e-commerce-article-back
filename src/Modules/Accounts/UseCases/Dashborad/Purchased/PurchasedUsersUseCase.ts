import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@Modules/Accounts/Repositories/IUsersRepository';
import { IArticlesRepository } from '@Modules/Article/Repositories/IArticlesRepository';
import { ArticlesRepository } from '@Modules/Article/Infra/Typeorm/Repositories/ArticleRepository';
import { ItemUserPurchasedRepository } from '@Modules/Accounts/Infra/typeorm/repositories/ItemUserPurchasedRepository';
import { ISaleItemRepository } from '@Modules/Sales/Repositories/ISaleItemRepository';
import { SaleItemRepository } from '@Modules/Sales/Infra/Typeorm/Repositories/SaleItemRepository';

import { Articles } from '@Modules/Article/Infra/Typeorm/Entities/Articles';
import { IItemUserPurchasedRepository } from '@Modules/Accounts/Repositories/IItemUserPurchasedRepository';
import { Find } from '@Shared/FindOcc';
import { Utility } from '../Utility';

interface IReturnDash {
  purchased: {
    listItemsPuschasedArticles: Articles[];
    count: number;
    themes: GetThemes[];
  };
}

interface IRequest {
  id: string;
}

type ItemUserPurchasedType = {
  article_id?: string;
  item_product?: string;
};
type GetThemes = {
  themes: string;
  total: number;
};

@injectable()
export class DashboradUsersUseCase {
  private dash: IReturnDash;

  constructor(
    @inject('ItemUserPurchasedRepository')
    private repository: IItemUserPurchasedRepository
  ) {}

  async execute({ id }: IRequest): Promise<IReturnDash> {
    const listItemsPuschased = await this.repository.findById(id);
    
    const listItemsPuschasedArticles = await Utility.GetArticles(
      listItemsPuschased
    );

    const themesPuschased = await Utility.GetTheme(listItemsPuschasedArticles);

    this.dash = {
      purchased: {
        listItemsPuschasedArticles,
        count: listItemsPuschased.length,
        themes: themesPuschased,
      },
    };
    return this.dash;
  }
}
