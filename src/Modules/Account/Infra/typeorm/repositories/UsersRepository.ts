import { DTOCreateUsers } from '@Modules/Account/DTOS/DTOCreateUsers';
import { User } from '@Modules/Account/Infra/typeorm/entities/Users';
import { IUsersRepository } from '@Modules/Account/Repositories/IUsersRepository';
import { hash } from 'bcrypt';
import { getRepository, Repository } from 'typeorm';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findById(id: string): Promise<User> {
    return await this.repository.findOne({ id });
  }

  findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email });
  }

  async create({
    email,
    name,
    password,
    job_role,
    img_url,
  }: DTOCreateUsers): Promise<void> {
    const user = this.repository.create({
      email,
      name,
      password,
      job_role,
      img_url,
    });

    await this.repository.save(user);
  }
}
