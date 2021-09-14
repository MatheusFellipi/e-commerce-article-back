import { IUsersDTO } from "@Modules/User/DTOS/IUsersDTO";
import { Users } from "@Modules/User/Infra/typeorm/entities/Users";
import { IUsersRepository } from "@Modules/User/Repositories/IUsersRepository";
import { hash } from "bcrypt"
import { getRepository, Repository } from "typeorm";

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
    const passwordHash = await hash(password, 8);

    const user = this.repository.create({
      email, 
      name, 
      password: passwordHash
    });
    
    await this.repository.save(user);
  }

}
export { UsersRepositoryInMemory };
