import fs from "fs";

export default class {
  sendError(res, errorMessage, replaceMessage) {
    fs.readFile("./src/data/errors.json", (err, data) => {
      data = JSON.parse(data);
      errorMessage = errorMessage.toString().toLowerCase();
      if (!data[errorMessage]) {
        throw new Error("Error message does not exist");
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
    });
  }
}
