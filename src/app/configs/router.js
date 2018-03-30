import * as jwt from "jsonwebtoken"

import { Server } from "../../server"
import { Authenticate } from "../middlewares/passport"
import { SolutionController } from "../controllers/solution"
import { EnvironmentController } from "../controllers/environment"
import { EnvironmentScheduleController } from "../controllers/environment_schedule"

exports.Router = (app) => {

    app.route('/login')
        .post(SolutionController.login)

    app.route('/environment')
        .get(Authenticate({}), EnvironmentController.get)
        .post(Authenticate({}), EnvironmentController.add)
    
    app.route('/environment/:id')
        .put(EnvironmentController.updateEnvById)
        .delete(EnvironmentController.deleteEnvById)
    
    app.route('/environment/:id/schedule')
        .get(EnvironmentScheduleController.get)
}