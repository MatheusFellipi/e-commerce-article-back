import { UsersRepositoryInMemory } from '@Modules/Account/Repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@Shared/Errors/AppError';
import { CreateUsersUseCase } from './CreateUsersUseCase';

describe('Create theme', () => {
  let createUsersUseCase: CreateUsersUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUsersUseCase = new CreateUsersUseCase(usersRepositoryInMemory);
  });
  it('should be able to create a new Users', async () => {
    const users = {
      email: 'Teste users',
      password: 'Teste users',
      name: 'Teste users',
    };

    await createUsersUseCase.execute({
      email: users.email,
      name: users.name,
      password: users.password,
    });

    const categoryCreated = await usersRepositoryInMemory.findByEmail(
      users.email
    );

    expect(categoryCreated).toHaveProperty('id');
  });
  it('should not be able to create a new Users with name exists', async () => {
    expect(async () => {
      const users = {
        email: 'Teste users',
        password: 'Teste users',
        name: 'Teste users',
      };

      await createUsersUseCase.execute({
        email: users.email,
        name: users.name,
        password: users.password,
      });

      await createUsersUseCase.execute({
        email: users.email,
        name: users.name,
        password: users.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('should come with encrypted password', async () => {
    const users = {
      email: 'Teste users',
      password: 'Teste users',
      name: 'Teste users',
    };

    await createUsersUseCase.execute({
      email: users.email,
      name: users.name,
      password: users.password,
    });

    const categoryCreated = await usersRepositoryInMemory.findByEmail(
      users.email
    );

    expect(categoryCreated.password).not.toBe(users.password);
  });
});
