import { CreateThemeController } from "@Modules/Article/UseCases/Theme/CreateThemeController";
import { Router } from "express";

const routeThemes = Router();
const createThemeController = new CreateThemeController()

routeThemes.post("/", createThemeController.handle);

export { routeThemes };
