import { Server } from '../server'
import { cyan, blue } from 'colors'

Server.listen(Server.get('port'), () => {
	console.log(cyan('SERVER>') + " Listening in " + blue(`:${Server.get('port')}`))
})