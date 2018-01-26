const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const heroes = require('./heroes.json')
const router = express.Router()

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

router.route('/heroes')
.get(function (req, res) {
        res.json(heroes)
})

router.route('/heroes/:heroName')
.get(function (req, res) {
    const {heroName} = req.params

    let hero = heroes.filter(hero => hero.PrimaryName.toLowerCase() === heroName.toLowerCase())[0]
    res.send(hero)
})

app.use(router)
app.use('/static', express.static(path.join(__dirname, 'public')))

app.listen(8080)