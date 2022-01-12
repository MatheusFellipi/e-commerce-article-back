import { DTOSales_item } from '../DTOS/DTOSales_item';

export interface ISaleItemRepository {
  create(data: DTOSales_item): Promise<void>;
}
