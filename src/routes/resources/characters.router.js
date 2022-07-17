import { Router } from "express";
import CharactersController from "../../resources/characters.controllers.js";



const charactersRouter = Router();
const service = new CharactersController();


charactersRouter.get('/random', (req,res) => service.getRandomCharacter(req, res))


export default charactersRouter