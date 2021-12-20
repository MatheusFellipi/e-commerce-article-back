import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUseAvatarUseCase } from "./UpdateUseAvatarUseCase";

class UpdateUseAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const avatar_File = request.file.filename;

    const updateUseAvatarUseCase = container.resolve(UpdateUseAvatarUseCase);

    await updateUseAvatarUseCase.execute({ user_id: id, avatar_File });
    return response.status(204).send();
  }
}

export { UpdateUseAvatarController };
