import { inject, injectable } from 'tsyringe';
import { Articles } from '@Modules/Article/Infra/Typeorm/Entities/Articles';
import { IItemUserPurchasedRepository } from '@Modules/Accounts/Repositories/IItemUserPurchasedRepository';
import { Utility } from '../Utility';

interface IRequest {
  id: string;
}

type GetThemes = {
  themes: string;
  total: number;
};

interface IReturnDash {
  purchased: Articles[];
  themes: GetThemes[];
}

@injectable()
export class PurchasedUsersUseCase {
  constructor(
    @inject('ItemUserPurchasedRepository')
    private repository: IItemUserPurchasedRepository
  ) {}

  async execute({ id }: IRequest): Promise<IReturnDash> {
    const listItemsPurchased = await this.repository.findByUserId(id);
    const listItemsPurchasedArticles = await Utility.GetArticles(
      listItemsPurchased
    );
    const themesPurchased = await Utility.GetTheme(listItemsPurchasedArticles);
    return {
      purchased: listItemsPurchasedArticles,
      themes: themesPurchased,
    };
  }
}
