import { inject, injectable } from 'tsyringe';

import { AppError } from '@Shared/Errors/AppError';
import { IUsersRepository } from '@Modules/Account/Repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password, name }: IRequest): Promise<void> {
    const UsersAlreadyExists = await this.usersRepository.findByEmail(email);

    if (UsersAlreadyExists) {
      throw new AppError('Users ja existe!');
    }

    this.usersRepository.create({ email, password, name });
  }
}
export { CreateUsersUseCase };
