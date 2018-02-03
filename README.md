# heroes-of-the-storm-api

Using Express, Nodejs, GraphQL

### Demo

Hosted here to demo but for reliability you should host it yourself.

http://207.246.117.229/heroes-of-the-storm

http://207.246.117.229/heroes-of-the-storm/graphql

### Example Queries

Query 

```javascript
query getHero($PrimaryName: String!) {
  hero(PrimaryName: $PrimaryName) {
    PrimaryName
    ImageURL
    Group
    SubGroup
  }
}

query getHeroesByGroup($Group: String!) {
  heroesByGroup(Group: $Group) {
    PrimaryName
    ImageURL
    Group
    SubGroup
  }
}

query getAllHeroes {
  heroes {
    PrimaryName
    ImageURL
    Group
    SubGroup
  }
}

```

Query Variables

```json
{
  "Group": "Support",
  "PrimaryName": "Tracer"
}
```


### Hero
```json
{
    "PrimaryName": "Abathur",
    "ImageURL": "https://blzmedia-a.akamaihd.net/heroes/abathur/bust.jpg",
    "Group": "Specialist",
    "SubGroup": "Utility"
}
```

### TODO
heroesBySubGroup
