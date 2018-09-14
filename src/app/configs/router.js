import * as jwt from "jsonwebtoken"

import { Server } from "../../server"
import { Authenticate } from "../middlewares/passport"
import { UserController } from "../controllers/user"
import { EnvironmentController } from "../controllers/environment"
import { EnvironmentScheduleController } from "../controllers/environment_schedule"
import { EnvironmentStatusController } from "../controllers/environment_status"
import { ModuleController } from "../controllers/module"
import { SolutionController } from "../controllers/solution"

exports.Router = (app) => {

    app.route('/login')
        .post(UserController.login)
        .put(Authenticate({}), UserController.password)

    app.route('/user')
        .get(Authenticate({}), UserController.get)

    app.route('/solution')
        .get(Authenticate({}), SolutionController.get)

    app.route('/environment')
        .get(Authenticate({}), EnvironmentController.get)
        .post(Authenticate({}), EnvironmentController.add)
    
    app.route('/environment/:id')
        .get(Authenticate({}), EnvironmentController.getById)
        .put(Authenticate({}), EnvironmentController.updateEnvById)
        .delete(Authenticate({}), EnvironmentController.deleteEnvById)
    
    app.route('/environment/:id/schedule')
        .get(Authenticate({}), EnvironmentScheduleController.get)
        .post(Authenticate({}), EnvironmentScheduleController.add)
        
    app.route('/schedule/:id')
        .put(Authenticate({}), EnvironmentScheduleController.updateById)
        .delete(Authenticate({}), EnvironmentScheduleController.deleteById)

    app.route('/environment/:id/status')
        .get(Authenticate({}), EnvironmentStatusController.get)
        .post(Authenticate({}), EnvironmentStatusController.add)

    app.route('/status/:id')
        .delete(Authenticate({}), EnvironmentStatusController.deleteById)
    
    app.route('/module')
        .get(Authenticate({}), ModuleController.get)
        .post(Authenticate({}), ModuleController.add)
        
    app.route('/module/:id')
        .put(Authenticate({}), ModuleController.updateById)
        .delete(Authenticate({}), ModuleController.deleteById)
}