import { Articles } from '@Modules/Article/Infra/Typeorm/Entities/Articles';
import { IArticlesRepository } from '@Modules/Article/Repositories/IArticlesRepository';
import { IItemUserPurchasedRepository } from '@Modules/Accounts/Repositories/IItemUserPurchasedRepository';
import { inject, injectable } from 'tsyringe';

type IReturn = {
  userIsPurchased: boolean;
} & Articles;

@injectable()
class ListByIdArticlesUseCase {
  constructor(
    @inject('ArticlesRepository')
    private __articlesRepository: IArticlesRepository,
    @inject('ItemUserPurchasedRepository')
    private __userPurchasedRepository: IItemUserPurchasedRepository
  ) {}

  async execute(article_id: string, user_id: string): Promise<IReturn> {
    const data = await this.__userPurchasedRepository.findByUserId(user_id);
    const isPurchased = data.find((x) => x.article_id === article_id);
    let userIsPurchased = false;
    if (isPurchased) {
      userIsPurchased = true;
    }
    const article = await this.__articlesRepository.FindById(article_id);
    return {
      ...article,
      text: JSON.parse(article.text),
      userIsPurchased,
    };
  }
}
export { ListByIdArticlesUseCase };
