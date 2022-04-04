import { User } from '@Modules/Accounts/Infra/typeorm/Entities/Users';
import { Articles } from '@Modules/Article/Infra/Typeorm/Entities/Articles';
import { ArticlesRepository } from '@Modules/Article/Infra/Typeorm/Repositories/ArticleRepository';
import { Find } from '@Shared/FindOcc';

type ItemUserPurchasedType = {
  article_id?: string;
  item_product?: string;
};

type GetThemes = {
  themes: string;
  total: number;
};

export const Utility = {
  async GetArticles(arr: ItemUserPurchasedType[]): Promise<any[]> {
    const articlesRepository = new ArticlesRepository();

    return Promise.all(
      arr.map(async (item) => {
        let listArticle: Articles;
        if (item.article_id) {
          listArticle = await articlesRepository.FindById(item.article_id);
          return this.FormattedArticlesDashEHomeUsers(listArticle);
        }
        if (item.item_product) {
          listArticle = await articlesRepository.FindById(item.item_product);
          return this.FormattedArticlesDashEHomeUsers(listArticle);
        }
      })
    );
  },

  FormattedArticlesDashEHomeUsers(data: Articles) {
    return {
      id: data.id,
      title: data.title,
      user_id: data.user_id,
      amount: data.amount,
      themes: JSON.parse(data.themes),
      img_url: data.img_url,
      created_at: data.created_at,
      update_at: data.update_at,
      user: {
        id: data.user.id,
        name: data.user.name,
        job_role: data.user.job_role,
        avatar: data.user.avatar,
      },
    };
  },

  FormattedArticlesDashEHome(data: Articles) {
    return {
      id: data.id,
      title: data.title,
      user_id: data.user_id,
      amount: data.amount,
      themes: JSON.parse(data.themes),
      img_url: data.img_url,
      created_at: data.created_at,
      update_at: data.update_at,
    };
  },

  FormattedUsers(data: User) {
    return {
      id: data.id,
      name: data.name,
      job_role: data.job_role,
      avatar: data.avatar,
    };
  },

  async GetTheme(arr: any[]): Promise<GetThemes[]> {
    let auxThems = [];
    let themes = [];
    const key = 'themes';
    arr.map((item) => {
      auxThems = JSON.parse(item.themes);
      auxThems.map((item) => {
        const e = {
          themes: item,
        };
        themes.push(e);
      });
    });

    return Find.Occ(themes, key);
  },
};
