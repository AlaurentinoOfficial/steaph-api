import * as jwt from "jsonwebtoken"

import { Server } from "../../server"
import { Authenticate } from "../middlewares/passport"
import { SolutionController } from "../controllers/solution"
import { EnvironmentController } from "../controllers/environment"

exports.Router = (app) => {

    app.route('/login')
        .post(SolutionController.login)

    app.route('/environment')
        .get(Authenticate({}), EnvironmentController.get)
        .post(Authenticate({}), EnvironmentController.addEnv)
    
    app.route('/environment/:id')
        .put(EnvironmentController.updateEnvById)
        .delete(EnvironmentController.deleteEnvById)
}