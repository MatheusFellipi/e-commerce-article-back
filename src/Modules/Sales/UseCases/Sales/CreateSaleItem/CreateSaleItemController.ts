import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSaleItemUseCase } from './CreateSaleItemUseCase';

class CreateSaleItemController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { amount, item_product, seller } = request.body;
    const { id } = request.user;
    const createArticlesUseCase = container.resolve(CreateSaleItemUseCase);

    await createArticlesUseCase.execute({
      amount,
      item_product,
      seller,
      user_id: id,
    });

    return response.status(201).send();
  }
}
export { CreateSaleItemController };
