import { Router } from "express";



const locationsRouter = Router();

locationsRouter.get('/', (req, res) => {
    res.status(200)
})


export default locationsRouter