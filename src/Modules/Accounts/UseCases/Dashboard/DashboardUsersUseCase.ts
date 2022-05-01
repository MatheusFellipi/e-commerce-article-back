import { inject, injectable } from 'tsyringe';
import { ISaleItemRepository } from '@Modules/Sales/Repositories/ISaleItemRepository';
import { SaleItem } from '@Modules/Sales/Infra/Typeorm/Entities/SaleItem';
import { Utility } from './Utility';
import { Find } from '@Shared/FindOcc';

interface IReturnDash {
  salesOfArticles: number;
  readArticles: number;
  purchasedArticles: number;
  citationsReceived: number;
  listSales: SaleItem[];
  options: any;
}

interface IRequest {
  id: string;
}

@injectable()
export class DashboardUsersUseCase {
  private dash: IReturnDash;

  constructor(
    @inject('SaleItemRepository')
    private repository: ISaleItemRepository
  ) {}

  async execute({ id }: IRequest): Promise<IReturnDash> {
    const { listSales, count } = await this.SalesBest(id);

    this.dash = {
      salesOfArticles: count,
      readArticles: count,
      citationsReceived: 0,
      purchasedArticles: 0,
      listSales,
      options: {
        title: {
          text: 'Your sales for the last 7 days',
          align: 'left',
        },

        xAxis: {
          type: 'datetime',
          title: {
            text: null,
          },
          units: [['month', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]]],
        },

        yAxis: {
          title: {
            text: null,
          },
        },

        series: [
          {
            data: [
              [new Date('2022-04-02T19:41:07.328Z'), 40],
              [new Date('2022-03-02T19:41:07.328Z'), 50],
              [new Date('2022-02-02T19:41:07.328Z'), 100],
              [new Date('2022-01-02T19:41:07.328Z'), 200],
            ],
            pointStart: 0,
          },
        ],
      },
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
