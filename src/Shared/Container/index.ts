import { container, delay } from 'tsyringe';

import { IThemeRepository } from '@Modules/Article/Repositories/IThemeRepository';
import { ThemeRepository } from '@Modules/Article/Infra/Typeorm/Repositories/ThemesRepository';

import { IUsersRepository } from '@Modules/Accounts/Repositories/IUsersRepository';
import { UsersRepository } from '@Modules/Accounts/Infra/typeorm/repositories/UsersRepository';

import { IArticlesRepository } from '@Modules/Article/Repositories/IArticlesRepository';
import { ArticlesRepository } from '@Modules/Article/Infra/Typeorm/Repositories/ArticleRepository';

import { ISaleItemRepository } from '@Modules/Sales/Repositories/ISaleItemRepository';
import { SaleItemRepository } from '@Modules/Sales/Infra/Typeorm/Repositories/SaleItemRepository';

import { ISaleRepository } from '@Modules/Sales/Repositories/ISaleRepository';
import { SaleRepository } from '@Modules/Sales/Infra/Typeorm/Repositories/SaleRepository';

container.registerSingleton<IThemeRepository>(
  'ThemeRepository',
  delay(() => ThemeRepository)
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  delay(() => UsersRepository)
);

container.registerSingleton<IArticlesRepository>(
  'ArticlesRepository',
  delay(() => ArticlesRepository)
);

container.registerSingleton<ISaleItemRepository>(
  'SaleItemRepository',
  delay(() => SaleItemRepository)
);

container.registerSingleton<ISaleRepository>(
  'SaleRepository',
  delay(() => SaleRepository)
);
