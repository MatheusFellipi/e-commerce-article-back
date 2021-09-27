import { IUsersDTO } from '@Modules/Account/DTOS/IUsersDTO';
import { Users } from '@Modules/Account/Infra/typeorm/entities/Users';
import { IUsersRepository } from '../IUsersRepository';
import { hash } from 'bcrypt';

class UsersRepositoryInMemory implements IUsersRepository {
  private userArry: Users[];

  constructor() {
    this.userArry = [];
  }

  async findByEmail(termoPesquisa: string): Promise<Users> {
    return this.userArry.find((user) => user.email === termoPesquisa);
  }

  async create({ email, name, password }: IUsersDTO): Promise<void> {
    const user = new Users();

    const passwordHash = await hash(password, 7456);

    Object.assign(user, {
      email,
      name,
      password: passwordHash,
    });

    this.userArry.push(user);
  }
}
export { UsersRepositoryInMemory };
