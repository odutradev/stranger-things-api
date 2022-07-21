import { readFileSync } from "fs";

import { sendError } from "../app.js";

export default class UtilCuriosities {
  getFile(callback) {
    var data = readFileSync(`./src/data/curiosities/data.json`);
    data = JSON.parse(data).curiosities;
    callback(data);
  }

  sendCurisioty(req, res, data, returnObject) {
    var language = req.headers["language"] || req.query.language || "en_us";
    if (language != "pt_br" && language != "en_us")
      return sendError(res, "language_not_supported");

    const curisioty = data[language];
    if (!curisioty) return sendError(res, "internal_error");
    if (returnObject) {
      return {
        id: data.id,
        curisioty,
      };
    } else {
      return res.status(200).json({
        id: data.id,
        curisioty,
      });
    }
  }
}
