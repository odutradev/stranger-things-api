import {readFile, readdirSync, readFileSync} from 'fs';

import {sendError} from '../app.js'

export const getFile = async (res, callback) => {

    var paste = readdirSync('./src/data/characters');
    paste.forEach((dir, index) => {

        var data = readFileSync(`./src/data/characters/${dir}`);
        data = JSON.parse(data);
            callback(data, paste, index);

    })

}

export const sendCharacter = (req, res, data, returnObject) => {

    var language = req.headers['language'] || req.query.language || 'en_us';
    if (language != 'pt_br' && language != 'en_us') return sendError(res, "language_not_supported");

    const character = data[language];
    if (!character) return sendError(res, "internal_error");
    if (returnObject){
        return {
            id: data.id,
            character
        }
    } else {
        return res.status(200).json({
            id: data.id,
            character
        });
    }

}
