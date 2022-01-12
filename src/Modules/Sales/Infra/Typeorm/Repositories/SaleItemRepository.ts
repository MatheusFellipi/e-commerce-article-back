import { getRepository, Repository } from 'typeorm';
import { DTOSales_item } from '@Modules/Sales/DTOS/DTOSales_item';
import { SaleItem } from '@Modules/Sales/Infra/Typeorm/Entities/SaleItem';
import { ISaleItemRepository } from '@Modules/Sales/Repositories/ISaleItemRepository';

class SaleItemRepository implements ISaleItemRepository {
  private repository: Repository<SaleItem>;

  constructor() {
    this.repository = getRepository(SaleItem);
  }

  async create({
    amount,
    id_code_sale,
    item_product,
    seller,
  }: DTOSales_item): Promise<void> {
    const saleItem = this.repository.create({
      amount,
      id_code_sale,
      item_product,
      seller,
    });
    await this.repository.save(saleItem);
  }
}

export { SaleItemRepository };
