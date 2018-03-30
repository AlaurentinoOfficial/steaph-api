import * as jwt from "jsonwebtoken"

import { Server } from "../../server"
import { SolutionController } from "../controllers/solution"

exports.Router = (app) => {

    app.route('/login')
        .post(SolutionController.login)
}