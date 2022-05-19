import { v4 as uuidV4 } from 'uuid';
import { inject, injectable } from 'tsyringe';
import crypto from 'crypto';

import { ISaleItemRepository } from '@Modules/Sales/Repositories/ISaleItemRepository';
import { SaleRepository } from '@Modules/Sales/Infra/Typeorm/Repositories/SaleRepository';
import { ItemUserPurchasedRepository } from '@Modules/Accounts/Infra/typeorm/repositories/ItemUserPurchasedRepository';
import { AppError } from '@Shared/Errors/AppError';
import { IArticlesRepository } from '@Modules/Article/Repositories/IArticlesRepository';
import { ArticlesRepository } from '@Modules/Article/Infra/Typeorm/Repositories/ArticleRepository';

type product = {
  id?: string;
  amount: number;
  title: string;
  user_id: string;
};
type IsNotBuyArticlesType = {
  IsNotBuy: boolean;
  title: string;
};

interface IRequest {
  code_sale?: string;
  ids_product: string[];
  seller?: string;
  amount?: number;
  consumer: string;
}

@injectable()
class CreateSaleItemUseCase {
  private itemUserPurchasedRepository = new ItemUserPurchasedRepository();
  private articlesRepository: IArticlesRepository;
  private listItems_product: product[];

  private _IsNotBuyArticles: IsNotBuyArticlesType;
  constructor(
    @inject('SaleItemRepository')
    private salesItemRepository: ISaleItemRepository
  ) {
    this.articlesRepository = new ArticlesRepository();
    this.listItems_product = [];
    this._IsNotBuyArticles = {
      IsNotBuy: false,
      title: '',
    };
  }

  async execute({ ids_product, consumer }: IRequest): Promise<void> {
    const code_sale = crypto.randomBytes(16).toString('hex');
    const saleRepository = new SaleRepository();
    const itemUserPurchasedRepository = new ItemUserPurchasedRepository();

    await this.GetArticle(ids_product);
    await this.ValidateBuy(consumer);
    await this.DoDotBuyUserItems(consumer);

    if (this._IsNotBuyArticles.IsNotBuy) {
      throw new AppError(
        `Unauthorized purchase, User already owns the item ${this._IsNotBuyArticles.title}`
      );
    }

    const initialValue = 0;
    const total = this.listItems_product.reduce(
      (previousValue, currentValue) => previousValue + currentValue.amount,
      initialValue
    );

    this.listItems_product.map(async (product) => {
      await this.salesItemRepository.create({
        amount: product.amount,
        code_sale,
        item_product: product.id,
        seller: product.user_id,
      });
      await itemUserPurchasedRepository.create({
        article_id: product.id,
        user_id: consumer,
      });
    });

    await saleRepository.create({
      consumer,
      code_saleFK: code_sale,
      total,
    });
  }

  private async GetArticle(ids_product: string[]) {
    for (let index = 0; index < ids_product.length; index++) {
      const element = ids_product[index];
      const article = await this.articlesRepository.FindByIdOne(element);
      this.listItems_product.push(article);
    }
  }

  private async ValidateBuy(consumer: string): Promise<void> {
    const itemBuyConsumer = await this.itemUserPurchasedRepository.findById(
      consumer
    );

    this.listItems_product.map((product) => {
      itemBuyConsumer.map((itemBuyConsume) => {
        if (product.id === itemBuyConsume.article_id) {
          this._IsNotBuyArticles.IsNotBuy = true;
          this._IsNotBuyArticles.title = product.title;
        }
      });
    });
  }

  private async DoDotBuyUserItems(consumer: string) {
    this.listItems_product.map((item) => {
      if (item.user_id === consumer) {
        this._IsNotBuyArticles.IsNotBuy = true;
        this._IsNotBuyArticles.title = item.title;
      }
    });
  }
}

export { CreateSaleItemUseCase };
