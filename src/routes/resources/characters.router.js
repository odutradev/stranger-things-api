import { Router } from "express";



const charactersRouter = Router();

charactersRouter.get('/', (req, res) => {
    res.status(200)
})


export default charactersRouter