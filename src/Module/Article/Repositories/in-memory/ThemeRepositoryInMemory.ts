import { IThemeDTO } from 'Module/Article/DTOS/IThemeDTO';
import { Themes } from 'Module/Article/Infra/typeorm/entities/Themes';
import { IThemeRepository } from '../IThemeRepository';

class ThemeRepositoryInMemory implements IThemeRepository {
  private themesArr: Themes[];

  constructor() {
    this.themesArr = [];
  }

  async findByName(theme: string): Promise<Themes> {
    const res = this.themesArr.find((re) => re.theme === theme);
    return res;
  }

  async create({ theme }: IThemeDTO): Promise<void> {
    const themes = new Themes();

    Object.assign(themes, {
      theme,
    });

    this.themesArr.push(themes);
  }
}
export { ThemeRepositoryInMemory };
