import { Router } from "express";

import CuriositiesController from '../../resources/curiosities.controllers.js';

const service = new CuriositiesController();
const curiositiesRouter = Router();

curiositiesRouter.get('/list', (req, res) => service.getCuriosityList(req, res))
curiositiesRouter.get('/id/:id', (req, res) => service.getCuriosityById(req,res))
curiositiesRouter.get('/', (req, res) => service.getCuriosity(req,res))


export default curiositiesRouter