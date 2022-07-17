import { Router } from 'express'

import curiositiesRouter from './resources/curiosities.router.js';
import charactersRouter from './resources/characters.router.js';
import locationsRouter from './resources/locations.router.js';




export const router = Router()

router.get('/ping', (req, res) => {

    res.sendStatus(200)
    
})

router.use('/curiosities',  curiositiesRouter);
router.use('/characters',  charactersRouter);
router.use('/locations',  locationsRouter);

