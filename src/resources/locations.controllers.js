import {readdirSync, readFile} from 'fs';


import { getFile, sendLocation } from '../util/locations.js';
import { didYouMean } from '../util/checkSimilarity.js';
import {sendError} from '../app.js';



export default class LocationsController {

    getRandomLocation(req,res){
        
        var paste = readdirSync('./src/data/locations');
        var randomFile = paste[Math.floor(Math.random() * paste.length)]

        readFile(`./src/data/locations/${randomFile}`, (err, data) => {
            
            if (err) return sendError(res, "internal_error");
            data = JSON.parse(data);
            sendLocation(req, res, data)

        });

    }
    
    async getLocationById(req,res){
        var id = req.params.id;
        await getFile(res, (data) => {
            if (data?.id == id) sendLocation(req, res, data);
        });

        sendError(res, "location_not_found")
    }
    
    getLocationList(req,res){
        var locationList  = [];
        getFile(res, (data, paste, index) => {
            
            const { id, name } = data;
            locationList.push({id,name});
            if (paste.length == index+1) return res.status(200).json({ locations: locationList });

        });
    }
    
    async getLocations(req,res){
        var start = Number(req.query.start == 0 ? 1 : req.query.start);
        if (!start) return sendError(res, "invalid_query_parameters");
        
        var max = Number(req.query.max) - 1;
        if (!req.query.max || max > 10) max = 9
        max += start; 

        var locations = readdirSync('./src/data/locations');
        if (locations.length < start) return sendError(res, "location_limit", locations.length);
        locations = [];

     

        await getFile(res, (data, paste, index) => {
               
                if (!(parseInt(index+1) < start || parseInt(index+1) > max)){
                    var location = sendLocation(req, res, data, true);
                    locations.push(location);
                }
  
        })

        res.status(200).json({ locations });

    }

    getLocationByName(req,res){
    
        var name = req.params.name.toString().toLowerCase();
   
        var pushNames = []    
        getFile(res, (data, paste, index) => {

            if (data.name.toLowerCase() == name) {

                sendLocation(req, res, data);

            } else if (paste.length == index+1){

                pushNames.push({id: data.id, name: data.name});
                var simularityName = didYouMean(name, pushNames.map(x => x.name) );
                if (!simularityName)  return sendError(res, "location_not_found");
                return sendError(res, "location_similarity", simularityName)

            }
            pushNames.push({id: data.id, name: data.name});

        })

    }
}