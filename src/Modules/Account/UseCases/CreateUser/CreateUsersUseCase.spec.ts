import { DTOCreateUsers } from '@Modules/Account/DTOS/DTOCreateUsers';
import { UsersRepositoryInMemory } from '@Modules/Account/Repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@Shared/Errors/AppError';
import { CreateUsersUseCase } from '../CreateUser/CreateUsersUseCase';

describe('Create user', () => {
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let createUsersUseCase: CreateUsersUseCase;
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUsersUseCase = new CreateUsersUseCase(usersRepositoryInMemory);
  });

  it('should be able to create a new user', async () => {
    const user: DTOCreateUsers = {
      name: 'Nome',
      email: 'user@teste.com',
      password: '1223456',
      job_role: 'Front end',
      img_url: 'Uma foto',
    };

    await createUsersUseCase.execute(user);

    const res = await usersRepositoryInMemory.findByEmail(user.email);

    expect(res).toHaveProperty('id');
  });

  it('should not be able to create a new users with name exists', async () => {
    expect(async () => {
      const user: DTOCreateUsers = {
        name: 'Nome',
        email: 'user@teste.com',
        password: '1223456',
        job_role: 'Front end',
        img_url: 'Uma foto',
      };

      await createUsersUseCase.execute(user);
      await createUsersUseCase.execute(user);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should come encrypted password', async () => {
    const user: DTOCreateUsers = {
      name: 'Nome',
      email: 'user@teste.com',
      password: '1223456',
      job_role: 'Front end',
      img_url: 'Uma foto',
    };

    await createUsersUseCase.execute(user);

    const res = await usersRepositoryInMemory.findByEmail(user.email);
    expect(res.password).not.toEqual(user.password);
  });
});
