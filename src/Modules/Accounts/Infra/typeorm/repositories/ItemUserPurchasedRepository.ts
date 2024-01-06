import { DTOItemUserPurchased } from '@Modules/Accounts/DTOS/DTOItemUserPurchased';
import { getRepository, Repository } from 'typeorm';
import { IItemUserPurchasedRepository } from '@Modules/Accounts/Repositories/IItemUserPurchasedRepository';
import { ItemUserPurchased } from '../Entities/ItemUserPurchased';

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
    return await this.repository.find({ id: id });
  }
  async findByUserId(id: string): Promise<ItemUserPurchased[]> {
    return await this.repository.find({ user_id: id });
  }
  async findByUserAndArticleId(
    user_id: string,
    article_id: string
  ): Promise<ItemUserPurchased[]> {
    return await this.repository.find({
      user_id: user_id,
      article_id: article_id,
    });
  }
}

export { ItemUserPurchasedRepository };
