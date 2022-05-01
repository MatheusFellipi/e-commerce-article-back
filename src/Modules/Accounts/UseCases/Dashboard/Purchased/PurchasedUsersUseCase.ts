import { inject, injectable } from 'tsyringe';


import { Articles } from '@Modules/Article/Infra/Typeorm/Entities/Articles';
import { IItemUserPurchasedRepository } from '@Modules/Accounts/Repositories/IItemUserPurchasedRepository';
import { Utility } from '../Utility';

interface IReturnDash {
  purchased: {
    listItemsPuschasedArticles: Articles[];
    count: number;
    themes: GetThemes[];
  };
}

interface IRequest {
  id: string;
}

type ItemUserPurchasedType = {
  article_id?: string;
  item_product?: string;
};
type GetThemes = {
  themes: string;
  total: number;
};

@injectable()
export class DashboradUsersUseCase {
  private dash: IReturnDash;

  constructor(
    @inject('ItemUserPurchasedRepository')
    private repository: IItemUserPurchasedRepository
  ) {}

  async execute({ id }: IRequest): Promise<IReturnDash> {
    const listItemsPuschased = await this.repository.findById(id);
    
    const listItemsPuschasedArticles = await Utility.GetArticles(
      listItemsPuschased
    );

    const themesPuschased = await Utility.GetTheme(listItemsPuschasedArticles);

    this.dash = {
      purchased: {
        listItemsPuschasedArticles,
        count: listItemsPuschased.length,
        themes: themesPuschased,
      },
    };
    return this.dash;
  }
}
