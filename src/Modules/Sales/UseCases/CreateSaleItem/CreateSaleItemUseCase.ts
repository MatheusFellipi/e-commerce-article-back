import { v4 as uuidV4 } from 'uuid';
import { inject, injectable } from 'tsyringe';
import crypto from 'crypto';

import { ISaleItemRepository } from '@Modules/Sales/Repositories/ISaleItemRepository';
import { SaleRepository } from '@Modules/Sales/Infra/Typeorm/Repositories/SaleRepository';
import { ItemUserPurchasedRepository } from '@Modules/Accounts/Infra/typeorm/repositories/ItemUserPurchasedRepository';
import { AppError } from '@Shared/Errors/AppError';
import { IArticlesRepository } from '@Modules/Article/Repositories/IArticlesRepository';
import { ArticlesRepository } from '@Modules/Article/Infra/Typeorm/Repositories/ArticleRepository';
import { ISaleRepository } from '@Modules/Sales/Repositories/ISaleRepository';
import { ItemUserPurchased } from '@Modules/Accounts/Infra/typeorm/Entities/ItemUserPurchased';

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
  private __itemUserPurchasedRepository = new ItemUserPurchasedRepository();
  private __SaleRepository: ISaleRepository;
  private __articlesRepository: IArticlesRepository;
  private __IsNotBuyArticles: IsNotBuyArticlesType;

  constructor(
    @inject('SaleItemRepository')
    private __salesItemRepository: ISaleItemRepository
  ) {
    this.__SaleRepository = new SaleRepository();
    this.__articlesRepository = new ArticlesRepository();
    this.__IsNotBuyArticles = { IsNotBuy: false, title: '' };
  }

  async execute({ ids_product, consumer }: IRequest): Promise<void> {
    const code_sale = crypto.randomBytes(16).toString('hex');
    const listItemsProduct: product[] =
      await this.__articlesRepository.FindByIds(ids_product);
    const itemBuyConsumer = await this.__itemUserPurchasedRepository.findById(
      consumer
    );
    await this.__ValidateBuy(listItemsProduct, itemBuyConsumer);
    if (this.__IsNotBuyArticles.IsNotBuy) {
      throw new AppError(
        `Unauthorized purchase, User already owns the item ${this.__IsNotBuyArticles.title}`
      );
    }

    const total = listItemsProduct.reduce(
      (previousValue, currentValue) => previousValue + currentValue.amount,
      0
    );

    for (const product of listItemsProduct) {
      await this.__salesItemRepository.create({
        amount: product.amount,
        code_sale,
        item_product: product.id,
        seller: product.user_id,
      });
      await this.__itemUserPurchasedRepository.create({
        article_id: product.id,
        user_id: consumer,
      });
    }

    await this.__SaleRepository.create({
      consumer,
      code_saleFK: code_sale,
      total,
    });
  }

  private async __ValidateBuy(
    listProduct: product[],
    BuyConsumer: ItemUserPurchased[]
  ): Promise<void> {
    for (const product of listProduct) {
      for (const itemBuyConsume of BuyConsumer) {
        if (product.id === itemBuyConsume.article_id) {
          this.__IsNotBuyArticles.IsNotBuy = true;
          this.__IsNotBuyArticles.title = product.title;
        }
      }
    }
  }
}

export { CreateSaleItemUseCase };
