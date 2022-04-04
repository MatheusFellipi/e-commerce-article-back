import { inject, injectable } from 'tsyringe';
import { ISaleItemRepository } from '@Modules/Sales/Repositories/ISaleItemRepository';
import { SaleItem } from '@Modules/Sales/Infra/Typeorm/Entities/SaleItem';
import { Utility } from './Utility';
import { Find } from '@Shared/FindOcc';

interface IReturnDash {
  SalesOfArticles: number;
  ReadArticles: number;
  PurchasedArticles: number;
  CitationsReceived: number;
  listSales: SaleItem[];
}

interface IRequest {
  id: string;
}

@injectable()
export class DashboradUsersUseCase {
  private dash: IReturnDash;

  constructor(
    @inject('SaleItemRepository')
    private repository: ISaleItemRepository
  ) {}

  async execute({ id }: IRequest): Promise<IReturnDash> {
    const { listSales, count } = await this.SalesBest(id);

    this.dash = {
      SalesOfArticles: count,
      ReadArticles: count,
      CitationsReceived: 0,
      PurchasedArticles: 0,
      listSales,
    };
    return this.dash;
  }

  async SalesBest(id: string) {
    const listSales = await this.repository.findByUser(id);
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

    return {
      listSales: bestSalesNew,
      count: listSales.length,
    };
  }
}
