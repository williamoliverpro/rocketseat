const express = require('express')
const nunjucks = require('nunjucks')
const courses = require('./data')

const server = express()

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server
})

server.get('/', function (req, res) {
    return res.render("home")
})

server.get('/about', function (req, res) {
    const about = {
        name: "Rocketseat",
        description: "More than a technology education platform, an incredible community of devs looking for the next level🚀",
        techs: [
            "React.js",
            "React Native",
            "Node.js"
        ],
        links: [
            { name: "Github", url: "https://github.com/rocketseat" },
            { name: "Instagram", url: "https://www.instagram.com/rocketseat_oficial/" },
            { name: "Facebook", url: "https://www.facebook.com/rocketseat/" }
        ]
    }

    return res.render("about", { about })
})

server.get('/courses', function (req, res) {
    return res.render("courses", { items: courses })
})

server.get("/courses/:id", function (req, res) {
    const id = req.params.id;

    const course = courses.find(function(course) {
        return course.id == id
    })

    if (!course) {
        return res.send("Course not found!")
    }

    return res.render("course", { item: course });
})

server.use(function (req, res) {
    res.status(404).render("not-found");
});

server.listen(5000)