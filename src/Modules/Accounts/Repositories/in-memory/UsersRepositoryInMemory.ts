import { DTOCreateUsers } from '@Modules/Accounts/DTOS/DTOCreateUsers';
import { User } from '@Modules/Accounts/Infra/typeorm/Entities/Users';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepositoryInMemory implements IUsersRepository {
  private _users: User[] = [];

  async create({
    email,
    job_role,
    name,
    password,
  }: DTOCreateUsers): Promise<void> {
    const user = new User();

    Object.assign(user, {
      email,
      job_role,
      name,
      password,
    });

    this._users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this._users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this._users.find((user) => user.id === id);
  }
}
