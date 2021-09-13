import { IThemeDTO } from 'Module/Article/DTOS/IThemeDTO';
import { IThemeRepository } from 'Module/Article/Repositories/IThemeRepository';
import { getRepository, Repository } from 'typeorm';
import { Themes } from '../entities/Themes';

class ThemeRepository implements IThemeRepository {
  private repository: Repository<Themes>;

  constructor() {
    this.repository = getRepository(Themes);
  }

  async create({ theme }: IThemeDTO): Promise<void> {
    const themes = this.repository.create({
      theme,
    });
    await this.repository.save(themes);
  }

  async findByName(theme: string): Promise<Themes> {
    const res = this.repository.findOne({ theme });
    return res;
  }
}

export { ThemeRepository };
