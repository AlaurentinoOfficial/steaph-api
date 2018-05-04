import * as jwt from "jsonwebtoken"

import { Server } from "../../server"
import { Authenticate } from "../middlewares/passport"
import { UserController } from "../controllers/user"
import { EnvironmentController } from "../controllers/environment"
import { EnvironmentScheduleController } from "../controllers/environment_schedule"
import { EnvironmentStatusController } from "../controllers/environment_status";

exports.Router = (app) => {

    app.route('/login')
        .post(UserController.login)
        .put(Authenticate({}), UserController.password)

    app.route('/solution')
        .get(Authenticate({}), UserController.get)

    app.route('/environment')
        .get(Authenticate({}), EnvironmentController.get)
        .post(Authenticate({}), EnvironmentController.add)
    
    app.route('/environment/:uuid')
        .get(Authenticate({}), EnvironmentController.getById)
        .put(Authenticate({}), EnvironmentController.updateEnvById)
        .delete(Authenticate({}), EnvironmentController.deleteEnvById)
    
    app.route('/environment/:uuid/schedule')
        .get(Authenticate({}), EnvironmentScheduleController.get)
        .post(Authenticate({}), EnvironmentScheduleController.add)
        
    app.route('/schedule/:id')
        .delete(Authenticate({}), EnvironmentScheduleController.deleteById)

    app.route('/environment/:id/status')
        .get(Authenticate({}), EnvironmentStatusController.get)
        .post(Authenticate({}), EnvironmentStatusController.add)

    app.route('/status/:id')
        .delete(Authenticate({}), EnvironmentStatusController.deleteById)
}