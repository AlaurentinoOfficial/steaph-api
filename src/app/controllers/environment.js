import * as jwt from "jsonwebtoken";

import { Server } from "../../server";
import { EnvironmentSchema } from "../models/environment";
import { Strings } from "../configs/strings";

var body = {}

body.get = (req, res) => {
    res.json(res.locals.solution.environments);
}

exports.EnvironmentController = body