import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateArticlesUseCase } from './CreateArticleUseCase';

class CreateArticleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { text, themes, title, img_url, amount } = request.body;
    const { id } = request.user;
    const createArticlesUseCase = container.resolve(CreateArticlesUseCase);

    await createArticlesUseCase.execute({
      text,
      themes,
      title,
      img_url,
      amount,
      user_id: id,
    });

    return response.status(201).send();
  }
}
export { CreateArticleController };
