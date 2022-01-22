import { DTOSales_item } from '../DTOS/DTOSales_item';
import { SaleItem } from '../Infra/Typeorm/Entities/SaleItem';

export interface ISaleItemRepository {
  create(data: DTOSales_item): Promise<void>;
  findById(id: string): Promise<SaleItem>;
  findByProduct(codeProducts: string): Promise<SaleItem[]>;
  findByUser(user_id: string): Promise<SaleItem[]>;
}
