import { Router } from "express";

import CuriositiesController from "../../resources/curiosities.controllers.js";

const service = new CuriositiesController();
const curiositiesRouter = Router();

curiositiesRouter.get("/id/:id", service.getCuriosityById);
curiositiesRouter.get("/list", service.getCuriosityList);
curiositiesRouter.get("/", service.getCuriosity);

export default curiositiesRouter;
