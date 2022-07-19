import {readdirSync, readFileSync} from 'fs';

import {sendError} from '../app.js'

export const getFile = async (res, callback) => {

    var paste = readdirSync('./src/data/locations');
    paste.forEach((dir, index) => {

        var data = readFileSync(`./src/data/locations/${dir}`);
        data = JSON.parse(data);
            callback(data, paste, index);

    })

}

export const sendLocation = (req, res, data, returnObject) => {

    var language = req.headers['language'] || req.query.language || 'en_us';
    if (language != 'pt_br' && language != 'en_us') return sendError(res, "language_not_supported");

    const location = data[language];
    if (!location) return sendError(res, "internal_error");
    if (returnObject){
        return {
            id: data.id,
            location
        }
    } else {
        return res.status(200).json({
            id: data.id,
            location
        });
    }

}
