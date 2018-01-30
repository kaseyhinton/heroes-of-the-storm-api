const express = require('express')
const app = express()
const heroes = require('./heroes.json')

const expressGraphQL = require('express-graphql')
const {buildSchema} = require('graphql')

const schema = buildSchema(`
    type Query {
        hero(PrimaryName: String!): Hero
        heroes: [Hero]
        heroesByGroup(Group: String!): [Hero]
    },
    type Hero {
        PrimaryName: String,
        ImageURL: String,
        Group: String,
        SubGroup: String
    }
`)

const getHero = (args) => {
    const PrimaryName = args.PrimaryName
    return heroes.filter(hero => hero.PrimaryName.toLowerCase() === PrimaryName.toLowerCase())[0]
}

const getHeroes = () => heroes

const getHeroesByGroup = (args) => {
    const Group = args.Group
    return heroes.filter(hero => hero.Group.toLowerCase() === Group.toLowerCase())
}

const root = {
    hero: getHero,
    heroes: getHeroes,
    heroesByGroup: getHeroesByGroup
}

app.use('/graphql', (req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'content-type, authorization, content-length, x-requested-with, accept, origin')
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    res.header('Allow', 'POST, GET, OPTIONS')
    res.header('Access-Control-Allow-Origin', '*')
    if (req.method === 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next()
    }
}, expressGraphQL({schema: schema, rootValue: root, graphiql: true}))

app.listen(8080)