import { ArticlesRepository } from '@Modules/Article/Infra/Typeorm/Repositories/ArticleRepository';
import { Find } from '@Shared/FindOcc';
import { IArticlesRepository } from '@Modules/Article/Repositories/IArticlesRepository';
import { IItemUserPurchasedRepository } from '@Modules/Accounts/Repositories/IItemUserPurchasedRepository';
import { inject, injectable } from 'tsyringe';
import { ISaleItemRepository } from '@Modules/Sales/Repositories/ISaleItemRepository';
import { ItemUserPurchasedRepository } from '@Modules/Accounts/Infra/typeorm/repositories/ItemUserPurchasedRepository';
import { SaleItem } from '@Modules/Sales/Infra/Typeorm/Entities/SaleItem';
import { Utility } from '../Utility';

interface IReturnDash {
  totals: { themes: string; total: number }[];
  bestSales: SaleItem[];
  options: {
    labels: string[];
    values: number[];
  };
}

interface IRequest {
  id: string;
}

@injectable()
export class DashboardUsersUseCase {
  private dash: IReturnDash;
  private __articleRepository: IArticlesRepository;
  private __ItemUserPurchasedRepository: IItemUserPurchasedRepository;

  constructor(
    @inject('SaleItemRepository')
    private repository: ISaleItemRepository
  ) {
    this.__articleRepository = new ArticlesRepository();
    this.__ItemUserPurchasedRepository = new ItemUserPurchasedRepository();
  }

  async execute({ id }: IRequest): Promise<IReturnDash> {
    const listSales = await this.repository.findByUser(id);

    const bestSales = await this.SalesBest(listSales);
    const option = this.__graphic(listSales);

    this.dash = {
      totals: await this.__totals(listSales, id),
      bestSales,
      options: option,
    };

    return this.dash;
  }

  __graphic(listSales: SaleItem[]) {
    if (listSales.length === 0) {
      return {
        values: [0],
        labels: [''],
      };
    }
    const valueDay = {};
    const labels: string[] = [];
    listSales.forEach((venda) => {
      const dataVenda = new Date(venda.created_at).toLocaleDateString();
      if (!labels.includes(dataVenda)) {
        labels.push(dataVenda);
      }
      valueDay[dataVenda] = (valueDay[dataVenda] || 0) + venda.amount;
    });
    const values: number[] = Object.values(valueDay);
    return {
      values,
      labels,
    };
  }

  async __totals(listSales: SaleItem[], id: string) {
    const listArticle = await this.__articleRepository.FindByIdUser(id);
    const Purchased = await this.__ItemUserPurchasedRepository.findByUserId(id);
    const data = [
      {
        themes: 'Published articles',
        total: listArticle.length,
      },
      {
        themes: 'Sales of articles',
        total: listSales.length,
      },
      {
        themes: 'Purchased articles',
        total: Purchased.length,
      },
    ];
    return data;
  }

  async SalesBest(listSales: SaleItem[]) {
    const salesBest = Find.Occ(listSales, 'item_product', 'amount');
    const salesBestArticles = await Utility.GetArticles(salesBest.slice(0, 2));
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
    return bestSalesNew;
  }
}
