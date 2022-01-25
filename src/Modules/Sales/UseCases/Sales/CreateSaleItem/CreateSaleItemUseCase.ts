import { v4 as uuidV4 } from 'uuid';
import { inject, injectable } from 'tsyringe';
import crypto from 'crypto';

import { ISaleItemRepository } from '@Modules/Sales/Repositories/ISaleItemRepository';
import { SaleRepository } from '@Modules/Sales/Infra/Typeorm/Repositories/SaleRepository';
import { ItemUserPurchasedRepository } from '@Modules/Accounts/Infra/typeorm/repositories/ItemUserPurchasedRepository';
import { AppError } from '@Shared/Errors/AppError';

type product = {
  id?: string;
  amount: number;
  user_id: string;
};

interface IRequest {
  code_sale?: string;
  items_product: product[];
  seller?: string;
  amount?: number;
  consumer: string;
}

@injectable()
class CreateSaleItemUseCase {
  private itemUserPurchasedRepository = new ItemUserPurchasedRepository();
  private _IsNotBuyArticles: boolean;
  constructor(
    @inject('SaleItemRepository')
    private salesItemRepository: ISaleItemRepository
  ) {}

  async execute({ items_product, consumer }: IRequest): Promise<void> {
    const code_sale = crypto.randomBytes(16).toString('hex');
    const saleRepository = new SaleRepository();
    const itemUserPurchasedRepository = new ItemUserPurchasedRepository();

    let total = 0;

    await this.validateBuy(items_product, consumer);

    if (this._IsNotBuyArticles) {
      new AppError(
        `Comprar nao autorizada O usuário ja possui os artigos ${items_product} `
      );
      return;
    }

    items_product.map(async (product) => {
      await this.salesItemRepository.create({
        amount: product.amount,
        code_sale,
        item_product: product.id,
        seller: product.user_id,
      });
      total += product.amount;

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
  private async validateBuy(
    products: product[],
    consumer: string
  ): Promise<void> {
    const itemBuyConsumer = await this.itemUserPurchasedRepository.findById(
      consumer
    );
    products.map((product) => {
      itemBuyConsumer.map((itemBuyConsume) => {
        if (product.id === itemBuyConsume.article_id) {
          this._IsNotBuyArticles = true;
        } else this._IsNotBuyArticles = false;
      });
    });
  }
}
export { CreateSaleItemUseCase };
