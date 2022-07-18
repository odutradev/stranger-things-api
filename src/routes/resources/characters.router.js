import { Router } from "express";

import CharactersController from "../../resources/characters.controllers.js";



const charactersRouter = Router();
const service = new CharactersController();


charactersRouter.get('/name/:name', (req, res) => service.getCharacterByName(req,res));
charactersRouter.get('/random', (req, res) => service.getRandomCharacter(req,res));
charactersRouter.get('/id/:id', (req, res) => service.getCharacterById(req,res));
charactersRouter.get('/list',  (req,res) => service.getCharacterList(req,res));
charactersRouter.get('/',  (req,res) => service.getCharacters(req,res));

export default charactersRouter