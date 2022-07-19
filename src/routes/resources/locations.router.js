import { Router } from "express";

import LocationsController from '../../resources/locations.controllers.js';


const service = new LocationsController();
const locationsRouter = Router();



locationsRouter.get('/name/:name', (req, res) => service.getLocationByName(req,res));
locationsRouter.get('/random', (req, res) => service.getRandomLocation(req,res));
locationsRouter.get('/id/:id', (req, res) => service.getLocationById(req,res));
locationsRouter.get('/list', (req, res) => service.getLocationList(req,res));
locationsRouter.get('/', (req, res) => service.getLocations(req,res));


export default locationsRouter