import { DbConfig } from './app/config/database'
import { SolutionSchema } from './app/models/solution'

let argv = process.argv.slice(2)

DbConfig(
    argv.indexOf("--docker") >= 0
    ? "mongodb://mongo/steaph"
    : "mongodb://localhost:27017/steaph")

SolutionSchema.create({
name: "NAVE", email: "alaurentino.br@gmail.com", password: "1234567890n"},
(err, d) => {
    if(err) console.log("Invalid user!")
    console.log("User created!")
})