import { Router } from "express";

import SeasonsController from "../../resources/seasons.controllers.js";

const service = new SeasonsController();
const seasonsRouter = Router();

seasonsRouter.get("/:season", service.getSeason);

export default seasonsRouter;