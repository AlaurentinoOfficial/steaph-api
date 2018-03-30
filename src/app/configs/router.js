import * as jwt from "jsonwebtoken"

import { Server } from "../../server"
import { SolutionController } from "../controllers/solution"
import { EnvironmentController } from "../controllers/environments"

exports.Router = (app) => {

    app.route('/login')
        .post(SolutionController.login)

    app.route('/environments')
        .get(EnvironmentController.get)
}