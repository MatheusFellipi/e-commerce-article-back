import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@Modules/Accounts/Repositories/IUsersRepository';
import { IArticlesRepository } from '@Modules/Article/Repositories/IArticlesRepository';
import { ArticlesRepository } from '@Modules/Article/Infra/Typeorm/Repositories/ArticleRepository';
import { ItemUserPurchasedRepository } from '@Modules/Accounts/Infra/typeorm/repositories/ItemUserPurchasedRepository';
import { ISaleItemRepository } from '@Modules/Sales/Repositories/ISaleItemRepository';
import { SaleItemRepository } from '@Modules/Sales/Infra/Typeorm/Repositories/SaleItemRepository';

import { Articles } from '@Modules/Article/Infra/Typeorm/Entities/Articles';
import { SaleItem } from '@Modules/Sales/Infra/Typeorm/Entities/SaleItem';
import { IItemUserPurchasedRepository } from '@Modules/Accounts/Repositories/IItemUserPurchasedRepository';

interface IReturnDash {
  published: {
    listArticle: Articles[];
    count: number;
    themes: GetThemes[];
  };
  purchased: {
    listItemsPuschasedArticles: Articles[];
    count: number;
    themes: GetThemes[];
  };
  sales: {
    listSales: SaleItem[];
    count: number;
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
    const listItemsPuschased = await this.itemUserPurchasedRepository.findById(
      id
    );
    const listItemsPuschasedArticles = await this.GetArticles(
      listItemsPuschased
    );
    const themesPuschased = await this.GetTheme(listItemsPuschasedArticles);
    const themesPublished = await this.GetTheme(listArticle);

    const { listSales, count } = await this.SalesBest(id);

    this.dash = {
      published: {
        listArticle,
        count: listArticle.length,
        themes: themesPublished,
      },
      purchased: {
        listItemsPuschasedArticles,
        count: listItemsPuschased.length,
        themes: themesPuschased,
      },
      sales: {
        listSales,
        count,
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
    return this.FindOcc(themes, key);
  }

  FindOcc(arr: any[], key: string, acc?: string) {
    let arrAux = [];

    arr.forEach((item) => {
      if (arrAux.some((val) => val[key] === item[key])) {
        arrAux.forEach((k) => {
          if (k[key] === item[key]) {
            if (!acc) {
              k['total']++;
            }
            if (acc) {
              k[acc] = item[acc] + item[acc];
            }
          }
        });
      } else {
        let newObject = {};
        newObject[key] = item[key];
        if (!acc) {
          newObject['total'] = 1;
        }
        if (acc) {
          newObject[acc] = item[acc];
        }
        arrAux.push(newObject);
      }
    });

    return arrAux.sort();
  }

  async SalesBest(id: string) {
    const listSales = await this.salesItemRepository.findByUser(id);
    const salesBest = this.FindOcc(listSales, 'item_product', 'amount');
    const salesBestArticles = await this.GetArticles(salesBest.slice(0, 2));

    let bestSalesNew = [];
    salesBest.forEach((item) => {
      salesBestArticles.forEach((articles) => {
        if (item.item_product === articles.id) {
          const obj = {
            title: articles.title,
            amount: item.amount,
          };
          bestSalesNew.push(obj);
        }
      });
    });

    return {
      listSales: bestSalesNew,
      count: listSales.length,
    };
  }
}
