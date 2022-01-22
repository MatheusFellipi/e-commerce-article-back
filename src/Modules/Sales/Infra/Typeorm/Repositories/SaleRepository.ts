import { getRepository, Repository } from 'typeorm';
import { ISaleRepository } from '@Modules/Sales/Repositories/ISaleRepository';
import { Sales } from '../Entities/Sales';
import { DTOSales } from '@Modules/Sales/DTOS/DTOSales';

class SaleRepository implements ISaleRepository {
  private repository: Repository<Sales>;
  constructor() {
    this.repository = getRepository(Sales);
  }

  async findByConsumer(search: string): Promise<Sales[]> {
    return await this.repository.find({ consumer: search });
  }

  async findById(codeProducts: DTOSales): Promise<Sales> {
    return await this.repository.findOne({});
  }

  async create({ consumer, code_saleFK, id, total }: DTOSales): Promise<void> {
    const saleItem = this.repository.create({
      consumer,
      code_saleFK,
      id,
      total,
    });
    await this.repository.save(saleItem);
  }
}

export { SaleRepository };
