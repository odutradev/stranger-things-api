import { Router } from 'express';

import SeasonsController from '../../resources/seasons.controllers.js';


const { getSeason } = new SeasonsController();
const seasonsRouter = Router();

seasonsRouter.get('/:season', getSeason);





export default seasonsRouter;