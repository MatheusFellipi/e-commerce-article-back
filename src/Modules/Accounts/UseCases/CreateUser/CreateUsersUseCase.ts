import { inject, injectable } from 'tsyringe';
import { AppError } from '@Shared/Errors/AppError';
import { IUsersRepository } from '@Modules/Accounts/Repositories/IUsersRepository';
import { hash } from 'bcrypt';

interface IRequest {
  name: string;
  email: string;
  password: string;
  job_role: string;
  avatar?: string;
}

@injectable()
export class CreateUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository
  ) {}

  async execute({
    email,
    password,
    name,
    avatar,
    job_role,
  }: IRequest): Promise<void> {
    const UsersAlreadyExists = await this.repository.findByEmail(email);

    if (UsersAlreadyExists) {
      throw new AppError('Users already exists!');
    }

    const passwordHash = await hash(password, 8);

    this.repository.create({
      email,
      password: passwordHash,
      name,
      avatar,
      job_role,
    });
  }
}
