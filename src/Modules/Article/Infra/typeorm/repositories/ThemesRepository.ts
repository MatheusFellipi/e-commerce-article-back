import { getRepository, Repository } from 'typeorm';
import { DTOCreateTheme } from '@Modules/Article/DTOS/DTOCreateTheme';
import { IThemeRepository } from '@Modules/Article/Repositories/IThemeRepository';
import { Themes } from '../Entities/Themes';

class ThemeRepository implements IThemeRepository {
  private repository: Repository<Themes>;

  constructor() {
    this.repository = getRepository(Themes);
  }

  async create({ theme, id }: DTOCreateTheme): Promise<void> {
    const themes = this.repository.create({
      id,
      theme,
    });
    await this.repository.save(themes);
  }

  async list(): Promise<Themes[]> {
    return this.repository.find();
  }

  async findByName(theme: string): Promise<Themes> {
    return this.repository.findOne({ theme });
  }
}

export { ThemeRepository };
