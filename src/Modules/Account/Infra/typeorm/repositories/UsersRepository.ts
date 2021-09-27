import { IUsersDTO } from '@Modules/Account/DTOS/IUsersDTO';
import { Users } from '@Modules/Account/Infra/typeorm/entities/Users';
import { IUsersRepository } from '@Modules/Account/Repositories/IUsersRepository';
import { hash } from 'bcrypt';
import { getRepository, Repository } from 'typeorm';

class UsersRepositoryInMemory implements IUsersRepository {
  private repository: Repository<Users>;

  constructor() {
    this.repository = getRepository(Users);
  }

  findByEmail(email: string): Promise<Users> {
    const res = this.repository.findOne({ email });
    return res;
  }

  async create({ email, name, password }: IUsersDTO): Promise<void> {
    const passwordHash = await hash(password, 7456);

    const user = this.repository.create({
      email,
      name,
      password: passwordHash,
    });

    await this.repository.save(user);
  }
}
export { UsersRepositoryInMemory };
