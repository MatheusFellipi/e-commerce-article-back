import { DTOCreateUsers } from '@Modules/Accounts/DTOS/DTOCreateUsers';
import { UsersRepositoryInMemory } from '@Modules/Accounts/Repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@Shared/Errors/AppError';
import { CreateUsersUseCase } from '../CreateUser/CreateUsersUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

describe('Authenticate User', () => {
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let createUsersUseCase: CreateUsersUseCase;
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUsersUseCase = new CreateUsersUseCase(usersRepositoryInMemory);
  });

  it('should be able to authenticate a user', async () => {
    const user: DTOCreateUsers = {
      name: 'Nome',
      email: 'user@teste.com',
      password: '1223456',
      job_role: 'Front end',
    };

    await createUsersUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should be able to authenticate an nonexistent not user', async () => {
    expect(async () => {
      const result = await authenticateUserUseCase.execute({
        email: 'user@teste.com',
        password: '1223456',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to authenticate an incorrect password', async () => {
    expect(async () => {
      const user: DTOCreateUsers = {
        name: 'Nome',
        email: 'user@teste.com',
        password: '1223456',
        job_role: 'Front end',
      };

      await createUsersUseCase.execute(user);

      const result = await authenticateUserUseCase.execute({
        email: user.email,
        password: '',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
