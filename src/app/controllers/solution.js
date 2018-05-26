
var body = {}

body.get = (req, res) => {
    res.json(res.locals.solution)
}

exports.SolutionController = body