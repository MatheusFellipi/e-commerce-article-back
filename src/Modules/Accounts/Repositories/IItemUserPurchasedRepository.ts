import { DTOItemUserPurchased } from '../DTOS/DTOItemUserPurchased';
import { ItemUserPurchased } from '../Infra/typeorm/Entities/ItemUserPurchased';

export interface IItemUserPurchasedRepository {
  create(data: DTOItemUserPurchased): Promise<void>;
  findById(id: string): Promise<ItemUserPurchased[]>;
}
