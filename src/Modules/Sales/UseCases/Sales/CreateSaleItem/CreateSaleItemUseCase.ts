import { v4 as uuidV4 } from 'uuid';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@Shared/Errors/AppError';
import { ISaleItemRepository } from '@Modules/Sales/Repositories/ISaleItemRepository';

interface IRequest {
  id_code_sale?: string;
  item_product: string;
  seller: string;
  amount: number;
  user_id: string;
}

@injectable()
class CreateSaleItemUseCase {
  constructor(
    @inject('SaleItemRepository')
    private articleRepository: ISaleItemRepository
  ) {}

  async execute({
    id_code_sale,
    amount,
    item_product,
    seller,
    user_id,
  }: IRequest): Promise<void> {
    //Nota o id tem ser gerar aqui
    // para fazer relação com a tabelas de vendas
    // nota nao usar o user_id

    this.articleRepository.create({
      amount,
      id_code_sale,
      item_product,
      seller,
    });
  }
}
export { CreateSaleItemUseCase };
