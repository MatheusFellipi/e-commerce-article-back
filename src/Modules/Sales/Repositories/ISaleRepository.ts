import { DTOSales } from '../DTOS/DTOSales';
import { Sales } from '../Infra/Typeorm/Entities/Sales';

export interface ISaleRepository {
  create(data: DTOSales): Promise<void>;
  findById(codeProducts: DTOSales): Promise<Sales>;
}
