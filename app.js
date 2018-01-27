const express = require('express')
const app = express()
const heroes = require('./heroes.json')

const expressGraphQL = require('express-graphql')
const { buildSchema } = require('graphql')

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
    const PrimaryName = args.PrimaryName;
    return heroes.filter(hero => hero.PrimaryName.toLowerCase() === PrimaryName.toLowerCase())[0];
}

const getHeroes = () => heroes;

const getHeroesByGroup = (args) => {
    const Group = args.Group;
    return heroes.filter(hero => hero.Group.toLowerCase() === Group.toLowerCase());
}

const root = {
    hero: getHero,
    heroes: getHeroes,
    heroesByGroup: getHeroesByGroup
}

app.use('/graphql', expressGraphQL({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.listen(8080);