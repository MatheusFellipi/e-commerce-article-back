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

interface IReturnDash {
  published: {
    listArticle: Articles[];
    count: number;
    themes: GetThemes[];
  };
}

interface IRequest {
  id: string;
}
interface ISalesBest {
  title: string;
  amount: number;
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
  private itemUserPurchasedRepository: IItemUserPurchasedRepository;
  private articlesRepository: IArticlesRepository;
  private salesItemRepository: ISaleItemRepository;
  private dash: IReturnDash;

  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository
  ) {
    this.articlesRepository = new ArticlesRepository();
    this.itemUserPurchasedRepository = new ItemUserPurchasedRepository();
    this.salesItemRepository = new SaleItemRepository();
  }

  async execute({ id }: IRequest): Promise<IReturnDash> {
    const listArticle = await this.articlesRepository.FindByIdUser(id);
    const themesPublished = await this.GetTheme(listArticle);

    this.dash = {
      published: {
        listArticle,
        count: listArticle.length,
        themes: themesPublished,
      },
    };
    return this.dash;
  }

  async GetArticles(arr: ItemUserPurchasedType[]): Promise<Articles[]> {
    return Promise.all(
      arr.map(async (item) => {
        let listArticle: Articles;
        if (item.article_id) {
          listArticle = await this.articlesRepository.FindById(item.article_id);
          return listArticle;
        }
        if (item.item_product) {
          listArticle = await this.articlesRepository.FindById(
            item.item_product
          );
          return listArticle;
        }
      })
    );
  }

  async GetTheme(arr: any[]): Promise<GetThemes[]> {
    let auxThems = [];
    let themes = [];
    const key = 'themes';
    arr.map((item) => {
      auxThems = JSON.parse(item.themes);
      auxThems.map((item) => {
        const e = {
          themes: item,
        };
        themes.push(e);
      });
    });
    
    return Find.Occ(themes, key);
  }
}
