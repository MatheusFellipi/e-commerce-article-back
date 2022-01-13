import { v4 as uuidV4 } from 'uuid';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@Shared/Errors/AppError';

import { ISaleRepository } from '@Modules/Sales/Repositories/ISaleRepository';

interface IRequest {
  id: string;
  code_saleFK: string;
  total: number;
  consumer: string;
}

@injectable()
class CreateSaleUseCase {
  constructor(
    @inject('SaleRepository')
    private SalesRepository: ISaleRepository
  ) {}

  async execute({ consumer, code_saleFK, id, total }: IRequest): Promise<void> {
    this.SalesRepository.create({
      consumer,
      code_saleFK,
      id,
      total,
    });
  }
}
export { CreateSaleUseCase };
