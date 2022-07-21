import { Router } from "express";

import CharactersController from "../../resources/characters.controllers.js";

const service = new CharactersController();
const charactersRouter = Router();

charactersRouter.get("/name/:name", service.getCharacterByName);
charactersRouter.get("/random", service.getRandomCharacter);
charactersRouter.get("/id/:id", service.getCharacterById);
charactersRouter.get("/list", service.getCharacterList);
charactersRouter.get("/", service.getCharacters);

export default charactersRouter;
