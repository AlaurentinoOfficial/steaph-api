import { DbConfig } from './app/config/database'
import { SolutionSchema } from './app/models/solution'
import { UserSchema } from './app/models/user';

let argv = process.argv.slice(2)

DbConfig(
    argv.indexOf("--docker") >= 0
    ? "mongodb://mongo/steaph"
    : "mongodb://localhost:27017/steaph")


let sol = {
    name: "NAVE",
    cpf: "12345678910",
    cnpj: "12345678910056",
    type: "legal",
}
SolutionSchema.create(sol, (er, s) => {
    if(er || !s)
        return console.log("Invalid solution\n\n" + er)
    
    let user = {
        solution: s._id,
        name: "Anderson Laurentino",
        email: "alaurentino.br@gmail.com",
        password: "1234567890n",
        level: "admin"
    }
    UserSchema.create(user, (err, u) => {
        if(err || !u)
            return console.log("Invalid user\n\n" + err)
        
        console.log("User added!")
    });
})