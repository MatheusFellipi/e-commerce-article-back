import { UsersRepository } from '@Modules/Accounts/Infra/typeorm/repositories/UsersRepository';
import { AppError } from '@Shared/Errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayLoad {
  sub: string;
}
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  console.log(authHeader);

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');
  try {
    const { sub: user_id } = verify(
      token,
      '5221ec70259819bba5acc33bbcdac8cf'
    ) as IPayLoad;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists!', 401);
    }
    request.user = {
      id: user_id,
    };
    next();
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
}
