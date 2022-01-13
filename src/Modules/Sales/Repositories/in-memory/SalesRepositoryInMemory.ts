import { DTOSales } from '@Modules/Sales/DTOS/DTOSales';
import { Sales } from '@Modules/Sales/Infra/Typeorm/Entities/Sales';
import { ISaleRepository } from '../ISaleRepository';

export class SalesItemRepositoryInMemory implements ISaleRepository {
  findById(codeProducts: DTOSales): Promise<Sales> {
    throw new Error('Method not implemented.');
  }
  private _sales: Sales[] = [];

  async create({ consumer, fk_code_sale, id, total }: DTOSales): Promise<void> {
    const sale = new Sales();

    Object.assign(sale, {});

    this._sales.push(sale);
  }
}
