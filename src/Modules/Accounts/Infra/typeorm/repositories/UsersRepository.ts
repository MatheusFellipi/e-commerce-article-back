import { getRepository, Repository } from 'typeorm';
import { DTOCreateUsers } from '@Modules/Accounts/DTOS/DTOCreateUsers';
import { IUsersRepository } from '@Modules/Accounts/Repositories/IUsersRepository';
import { User } from '../Entities/Users';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    email,
    password,
    name,
    avatar,
    id,
    job_role,
  }: DTOCreateUsers): Promise<void> {
    const user = this.repository.create({
      email,
      password,
      name,
      job_role,
      avatar,
      id,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ email });
  }

  async findById(id: string): Promise<User> {
    return await this.repository.findOne(id);
  }
}

export { UsersRepository };
