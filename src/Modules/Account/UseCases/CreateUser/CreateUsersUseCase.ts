import { inject, injectable } from 'tsyringe';
import { AppError } from '@Shared/Errors/AppError';
import { IUsersRepository } from '@Modules/Account/Repositories/IUsersRepository';
import { hash } from 'bcrypt';

interface IRequest {
  name: string;
  email: string;
  password: string;
  job_role: string;
  img_url?: string;
}

@injectable()
class CreateUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    email,
    password,
    name,
    img_url,
    job_role,
  }: IRequest): Promise<void> {
    const UsersAlreadyExists = await this.usersRepository.findByEmail(email);

    if (UsersAlreadyExists) {
      throw new AppError('Users  already exists!');
    }
    const passwordHash = await hash(password, 8);

    this.usersRepository.create({
      email,
      password: passwordHash,
      name,
      img_url,
      job_role,
    });
  }
}
export { CreateUsersUseCase };
