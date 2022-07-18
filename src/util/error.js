import fs from 'fs';

const sendError = (res, errorMessage, replaceMessage) =>  {

  fs.readFile('./src/data/errors.json', (err, data) => {

    data = JSON.parse(data)
    errorMessage = errorMessage.toString().toLowerCase();
    if (!data[errorMessage]) {
        throw new Error('Error message does not exist');
    }

    const error = data[errorMessage];

    try {
        return res.status(error.statusCode).json({
            error: {
                code: error.statusCode,
                message: error.message.replace("%%%", replaceMessage),
            },
        });
    } catch {}

    })
}

export default sendError
