
import { getFile, sendCurisioty } from '../util/curiosities.js';
import { sendError } from '../../src/app.js';


export default class CuriositiesController {

    getCuriosityById(req, res){
        
        var id = req.params.id;

        getFile(res, (data) => {
            var curiosity = data.find(x => x.id == id);
            if (!curiosity) return sendError(res, "curisioty_not_found");
            sendCurisioty(req,res, curiosity)
        })

    }

    getCuriosity(req, res){
        getFile(res, (data) => {
             var curiosity = data[Math.floor(Math.random() * data.length)];
             if (!curiosity) return sendError(res, "internal_error");
             sendCurisioty(req,res, curiosity)
        })
    }

    async getCuriosityList(req, res){

        var start = Number(req.query.start == 0 ? 1 : req.query.start);
        if (!start) return sendError(res, "invalid_query_parameters");
        
        var max = Number(req.query.max) - 1;
        if (!req.query.max || max > 10) max = 9
        max += start; 

        var curiosities = [];
     

        await getFile(res, (data, paste, index) => {
               
            if (data.length < start) return sendError(res, "curisioty_limit", data.length);
            data.forEach((x, i) => {
                
                if (!(parseInt(i+1) < start || parseInt(i+1) > max)){
                    var curiosity = sendCurisioty(req, res, x, true);
                    curiosities.push(curiosity);
                }
                
            });
  
        })

        res.status(200).json({ curiosities })

    }

}