import { ICreateThemeDTO } from '@Modules/Article/DTOS/IThemeDTO';
import { Themes } from '@Modules/Article/Infra/Typeorm/Entities/Themes';
import { IThemeRepository } from '../IThemeRepository';

class ThemesRepositoryInMemory implements IThemeRepository {
  private dadosThemes: Themes[];

  constructor() {
    this.dadosThemes = [];
  }
  async findByName(name: string): Promise<Themes> {
    return this.dadosThemes.find((category) => category.theme === name);
  }

  async create({ theme }: ICreateThemeDTO): Promise<void> {
    const themes = new Themes();

    Object.assign(themes, {
      theme,
    });

    this.dadosThemes.push(themes);
  }
}
export { ThemesRepositoryInMemory };
