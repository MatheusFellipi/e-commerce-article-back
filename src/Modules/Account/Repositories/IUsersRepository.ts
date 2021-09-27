import { IUsersDTO } from '../DTOS/IUsersDTO';
import { Users } from '../Infra/typeorm/entities/Users';

interface IUsersRepository {
  create(data: IUsersDTO): Promise<void>;
  findByEmail(Email: string): Promise<Users>;
}

export { IUsersRepository };
