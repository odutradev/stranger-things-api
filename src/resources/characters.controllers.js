import { readFile, readdirSync } from 'fs';

import { getFile, sendCharacter} from '../util/characters.js';
import { didYouMean } from '../util/checkSimilarity.js';
import { sendError } from '../app.js';



export default class CharactersController {

    getRandomCharacter(req, res){              

        var paste = readdirSync('./src/data/characters');
        var randomFile = paste[Math.floor(Math.random() * paste.length)]

        readFile(`./src/data/characters/${randomFile}`, (err, data) => {
            
            if (err) return sendError(res, "internal_error");
            data = JSON.parse(data);
            sendCharacter(req, res, data)

        });

    }


    async getCharacterById(req,res){

        var id = req.params.id;
        await getFile(res, (data) => {
            if (data?.id == id) sendCharacter(req, res, data);
        });

        sendError(res, "character_not_found")

    }


    getCharacterByName(req,res){

            var name = req.params.name.toString().toLowerCase();
   
            var pushNames = []    
            getFile(res, (data, paste, index) => {

                if (data.name.toLowerCase() == name) {

                    sendCharacter(req, res, data);

                } else if (paste.length == index+1){

                    pushNames.push({id: data.id, name: data.name});
                    var simularityName = didYouMean(name, pushNames.map(x => x.name) );
                    if (!simularityName)  return sendError(res, "character_not_found");
                    return sendError(res, "character_similarity", simularityName)

                }
                pushNames.push({id: data.id, name: data.name});

            })

    }


        getCharacterList(req, res){
            
            var characterList  = [];
            getFile(res, (data, paste, index) => {
                
                const { id, name } = data;
                characterList.push({id,name});
                if (paste.length == index+1) return res.status(200).json({ characters: characterList });

            });

        }

        async getCharacters(req, res){
            
            var start = Number(req.query.start == 0 ? 1 : req.query.start);
            if (!start) return sendError(res, "invalid_query_parameters");
            
            var max = Number(req.query.max) - 1;
            if (!req.query.max || max > 10) max = 9
            max += start; 

            var characters = readdirSync('./src/data/characters');
            if (characters.length < start) return sendError(res, "character_limit", characters.length);
            characters = [];

         

            await getFile(res, (data, paste, index) => {
                   
                    if (!(parseInt(index+1) < start || parseInt(index+1) > max)){
                        var character = sendCharacter(req, res, data, true);
                        characters.push(character);
                    }
      
            })

            res.status(200).json({ characters });

        }

}