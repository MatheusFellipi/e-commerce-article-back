import { getRepository, Repository } from 'typeorm';
import { DTOCreateTheme } from '@Modules/Article/DTOS/DTOCreateTheme';
import { IThemeRepository } from '@Modules/Article/Repositories/IThemeRepository';
import { Themes } from '../Entities/Themes';

class ThemeRepository implements IThemeRepository {
  private repository: Repository<Themes>;

  constructor() {
    this.repository = getRepository(Themes);
  }

  async create({ theme }: DTOCreateTheme): Promise<void> {
    const themes = this.repository.create({
      theme,
    });
    await this.repository.save(themes);
  }

  async list(): Promise<Themes[]> {
    const res = this.repository.find();
    return res;
  }

  async findByName(theme: string): Promise<Themes> {
    const res = this.repository.findOne({ theme });
    return res;
  }
}

export { ThemeRepository };
