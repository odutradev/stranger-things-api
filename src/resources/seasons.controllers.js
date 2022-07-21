import { readFileSync, readdirSync } from 'fs';

import { sendError } from "../app.js";


export default class SeasonsController {

    getSeason(req, res){

       var season = req.params.season.toLowerCase();

       var paste = readdirSync('./src/data/seasons');
       paste.forEach((dir, index) => {
   
           var data = readFileSync(`./src/data/seasons/${dir}`);
           data = JSON.parse(data);
        
           var findSeason = data.names.find(name => name == season);
           
           if (findSeason){

            var language = req.headers['language'] || req.query.language || 'en_us';
            if (language != 'pt_br' && language != 'en_us') return sendError(res, "language_not_supported");
        
            const seasonData = data[language];
            if (!seasonData) return sendError(res, "internal_error");

            return res.status(200).json({
                id: data.id,
                season: seasonData
            })

           } else if (paste.length == index+1){

            return sendError(res, "season_not_found");

           }
   
       })

       
    }

}