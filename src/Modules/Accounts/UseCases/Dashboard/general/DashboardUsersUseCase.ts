import { IArticlesRepository } from '@Modules/Article/Repositories/IArticlesRepository';
import { IItemUserPurchasedRepository } from '@Modules/Accounts/Repositories/IItemUserPurchasedRepository';
import { inject, injectable } from 'tsyringe';
import { ISaleItemRepository } from '@Modules/Sales/Repositories/ISaleItemRepository';
import { SaleItem } from '@Modules/Sales/Infra/Typeorm/Entities/SaleItem';

type BestSales = {
  id: string;
  title: string;
  totalBuys: number;
  totalAmount: number;
};

interface IReturnDash {
  totals: { themes: string; total: number }[];
  bestSales: BestSales[];
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
  constructor(
    @inject('SaleItemRepository')
    private __saleItemRepos: ISaleItemRepository,
    @inject('ArticlesRepository')
    private __articleRepos: IArticlesRepository,
    @inject('ItemUserPurchasedRepository')
    private __itemUserPurchasedRepository: IItemUserPurchasedRepository
  ) {}
  async execute({ id }: IRequest): Promise<IReturnDash> {
    const listSales = await this.__saleItemRepos.findByOwner(id);
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
    if (listSales.length === 0) return { values: [0], labels: [''] };
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
    return { values, labels };
  }

  async __totals(listSales: SaleItem[], id: string) {
    const listArticle = await this.__articleRepos.FindByIdUser(id);
    const Purchased = await this.__itemUserPurchasedRepository.findByUserId(id);
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
    const idsArticles: string[] = listSales.map((item) => item.item_product);
    const articles = await this.__articleRepos.FindByIds(idsArticles);
    const data = articles.map((article) => ({
      id: article.id,
      title: article.title,
      totalBuys: 0,
      totalAmount: 0,
    }));
    for (const saleItem of listSales) {
      const index = data.findIndex((item) => item.id === saleItem.item_product);
      if (index !== -1) {
        data[index].totalBuys += 1;
        data[index].totalAmount += saleItem.amount;
      }
    }
    return data;
  }
}
