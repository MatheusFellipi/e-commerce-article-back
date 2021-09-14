import { container, delay } from 'tsyringe';
import { IThemeRepository } from '@Modules/Article/Repositories/IThemeRepository';
import { ThemeRepository } from '@Modules/Article/Infra/Typeorm/Repositories/ThemesRepository';

container.registerSingleton<IThemeRepository>(
  'ThemeRepository',
  delay(() => ThemeRepository)
);
