import { getRepository, Repository } from 'typeorm';
import { DTOItemUserPurchased } from '@Modules/Accounts/DTOS/DTOItemUserPurchased';
import { ItemUserPurchased } from '../Entities/ItemUserPurchased';
import { IItemUserPurchasedRepository } from '@Modules/Accounts/Repositories/IItemUserPurchasedRepository';

class ItemUserPurchasedRepository implements IItemUserPurchasedRepository {
  private repository: Repository<ItemUserPurchased>;

  constructor() {
    this.repository = getRepository(ItemUserPurchased);
  }

  async create({
    article_id,
    user_id,
    id,
  }: DTOItemUserPurchased): Promise<void> {
    const userPurchased = this.repository.create({ article_id, user_id, id });
    await this.repository.save(userPurchased);
  }

  async findById(id: string): Promise<ItemUserPurchased[]> {
    return await this.repository.find({ user_id: id });
  }
}

export { ItemUserPurchasedRepository };
