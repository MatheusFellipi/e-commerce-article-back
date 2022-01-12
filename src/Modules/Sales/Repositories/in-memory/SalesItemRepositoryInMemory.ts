import { DTOSales_item } from '@Modules/Sales/DTOS/DTOSales_item';
import { SaleItem } from '@Modules/Sales/Infra/Typeorm/Entities/SaleItem';
import { ISaleItemRepository } from '../ISaleItemRepository';

export class SalesItemRepositoryInMemory implements ISaleItemRepository {
  private _users: SaleItem[] = [];

  async create({}: DTOSales_item): Promise<void> {
    const saleItem = new SaleItem();

    Object.assign(saleItem, {});

    this._users.push(saleItem);
  }
}
