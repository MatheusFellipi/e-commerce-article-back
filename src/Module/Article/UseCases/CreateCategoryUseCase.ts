import { AppError } from 'Shared/Infra/typeorm/errors/appError';
import { inject, injectable } from 'tsyringe';
import { IThemeRepository } from '../Repositories/IThemeRepository';

interface IRequest {
  theme: string;
}
@injectable()
class CreateThemeUseCase {
  constructor(
    @inject('ThemeRepository')
    private themeRepository: IThemeRepository
  ) {}

  async execute({ theme }: IRequest): Promise<void> {
    const themeAlreadyExists = await this.themeRepository.findByName(theme);

    if (themeAlreadyExists) {
      throw new AppError('Tema ja existe!');
    }

    this.themeRepository.create({ theme });
  }
}
export { CreateThemeUseCase };
