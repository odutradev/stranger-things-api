import { Router } from "express";

import LocationsController from "../../resources/locations.controllers.js";

const service = new LocationsController();
const locationsRouter = Router();

locationsRouter.get("/name/:name", service.getLocationByName);
locationsRouter.get("/random", service.getRandomLocation);
locationsRouter.get("/id/:id", service.getLocationById);
locationsRouter.get("/list", service.getLocationList);
locationsRouter.get("/", service.getLocations);

export default locationsRouter;
