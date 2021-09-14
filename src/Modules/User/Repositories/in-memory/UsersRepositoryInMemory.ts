import { IUsersDTO } from "@Modules/User/DTOS/IUsersDTO";
import { Users } from "@Modules/User/Infra/typeorm/entities/Users";
import { IUsersRepository } from "../IUsersRepository";
import {hash} from "bcrypt"

class UsersRepositoryInMemory implements IUsersRepository {
  private UserArry: Users[];

  constructor() {
    this.UserArry = [];
  }

  async findByEmail(email: string): Promise<Users> {
    const res = this.UserArry.find((re) => re.email === email);
    return res;
  }

  async create({ email,name,password }: IUsersDTO): Promise<void> {
    const user = new Users();

    const passwordHash = await hash(password, 8);
    
    Object.assign(user, {
      email,
      name,
      password: passwordHash
    });

    this.UserArry.push(user);
  }
}
export { UsersRepositoryInMemory };
