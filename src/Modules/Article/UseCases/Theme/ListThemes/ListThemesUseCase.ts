import { inject, injectable } from 'tsyringe';
import { Themes } from '@Modules/Article/Infra/Typeorm/Entities/Themes';
import { IThemeRepository } from '@Modules/Article/Repositories/IThemeRepository';

@injectable()
class ListThemesUseCase {
  constructor(
    @inject('ThemeRepository')
    private themeRepository: IThemeRepository
  ) {}

  async execute(): Promise<Themes[]> {
    const themes = await this.themeRepository.list();
    return themes;
  }
}
export { ListThemesUseCase };
