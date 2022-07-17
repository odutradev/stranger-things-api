import { Router } from "express";



const curiositiesRouter = Router();

curiositiesRouter.get('/', (req, res) => {
    res.status(200)
})


export default curiositiesRouter