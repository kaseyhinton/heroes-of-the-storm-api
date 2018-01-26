const express = require('express')
const app = express()
const heroesV1 = require('./heroes-v1.json')

app.get('/:version/heroes', function (req, res) {
    if (req.params.version === 'v1')
        res.json(heroesV1)
    else
        res.send(404, 'Unable to find a resource with specified version number.')
})

app.get('/:version/heroes/:heroName', function (req, res) {
    const {heroName, version} = req.params
    
    if (version !== 'v1') {
        res.send(404, 'Unable to find a resource with specified version number.')
        return
    }

    let hero = heroesV1.filter(hero => hero.PrimaryName.toLowerCase() === heroName.toLowerCase())[0]
    res.send(hero)
})

app.listen(8080, () => console.log('listening on port 8080'))