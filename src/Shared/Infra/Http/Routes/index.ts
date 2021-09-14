import { Router } from "express";

import { routeThemes } from "./theme.routes";


const router = Router();

router.use("/themes", routeThemes);


export { router };
