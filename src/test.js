const assert = require("assert")
const axios = require("axios")

describe("Try login", async function() {
    it("try receive the token", async function() {
        var res = await axios.post("http://localhost:8080/login", {email: "alaurentino.br@gmail.com", password: "1234567890n"})
        
        if(res.data.token)
            axios.defaults.headers.common['Authorization'] = res.data.token

        assert.equal(true, res.data.token != null)
    })
})

describe("Create a new environment", async function() {
    it("Will create a new environment", async function() {

        var env = {
            device_id: "123ed5t8298h",
            name: "Lab de física",
            status: true
        }

        var res = await axios.post("http://localhost:8080/environment", env)
        assert.equal(true, res.data.code == 9)
    })
})

var envs = []

describe("Get all environments", async function() {
    it("Show the envs", async function() {
        var res = await axios("http://localhost:8080/environment")

        envs = res.data
        console.log(envs)

        assert.equal(true, res.data.constructor === [].constructor)
    })
})

describe("POST new Schedule", async function() {
    it("Created new schedule", async function() {

        var start = new Date()
        start.setUTCHours(start.getUTCHours - 1)

        var end = new Date()
        end.setUTCHours(end.getUTCHours + 1)

        var schedule = {
            start: start,
            end: end,
            day: 0
        }

        console.log(schedule)

        var res = await axios.post(`http://localhost:8080/environment/${envs[0]._id}/schedule`, schedule)
        console.log(res.data)
        assert.equal(true, res.data.code == 9)
    })
})

var schedules = []

describe("GET all schedules of that env: ", async function() {
    it("Show the schedules", async function() {
        var res = await axios(`http://localhost:8080/environment/${envs[0]._id}/schedule`)

        schedules = res.data
        console.log(schedules)

        assert.equal(true, res.data.constructor === [].constructor)
    })
})