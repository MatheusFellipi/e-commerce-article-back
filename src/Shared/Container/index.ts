import { container, delay } from 'tsyringe';

import { IThemeRepository } from '@Modules/Article/Repositories/IThemeRepository';
import { ThemeRepository } from '@Modules/Article/Infra/Typeorm/Repositories/ThemesRepository';

import { IUsersRepository } from '@Modules/Account/Repositories/IUsersRepository';
import { UsersRepository } from '@Modules/Account/Infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IThemeRepository>(
  'ThemeRepository',
  delay(() => ThemeRepository)
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  delay(() => UsersRepository)
);
