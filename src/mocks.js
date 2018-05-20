import { DbConfig } from './app/configs/database'
import { SolutionSchema } from './app/models/solution'
import { UserSchema } from './app/models/user';

let argv = process.argv.slice(2)

DbConfig(
    argv.indexOf("--docker") >= 0
    ? "mongodb://mongo/steaph"
    : "mongodb://localhost:27017/steaph")


let solutionBody = {
    name: "NAVE",
    cpfcnpj: "12345678910056",
    type: "legal",
}
SolutionSchema.create(solutionBody, (er, solution) => {
    if(er || !solution)
        return console.log("Invalid solution\n\n" + er)
    
    let userBody = {
        solution: solution._id,
        name: "Steaph - Smart Energy",
        email: "steaph.contact@gmail.com",
        password: "1234567890n",
        level: "admin"
    }
    UserSchema.create(userBody, (err, user) => {
        if(err || !user)
            return console.log("Invalid user\n\n" + err)
        
        console.log("User added!")
    });
})