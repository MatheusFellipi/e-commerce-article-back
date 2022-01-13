import { v4 as uuidV4 } from 'uuid';
import { inject, injectable } from 'tsyringe';

import { ISaleItemRepository } from '@Modules/Sales/Repositories/ISaleItemRepository';

import { SaleRepository } from '@Modules/Sales/Infra/Typeorm/Repositories/SaleRepository';
import crypto from 'crypto';

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
  constructor(
    @inject('SaleItemRepository')
    private salesItemRepository: ISaleItemRepository
  ) {}

  async execute({ items_product, consumer }: IRequest): Promise<void> {
    const code_sale = crypto.randomBytes(16).toString('hex');
    const saleRepository = new SaleRepository();
    let total = 0;

    //se o usuário ja tem o artigo nao irar comprar novamente

    items_product.map((product) => {
      this.salesItemRepository.create({
        amount: product.amount,
        code_sale,
        item_product: product.id,
        seller: product.user_id,
      });

      total += product.amount;
    });

    saleRepository.create({
      consumer,
      code_saleFK: code_sale,
      total,
    });
  }
}
export { CreateSaleItemUseCase };
