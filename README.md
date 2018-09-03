# interview-v2

Simple REST API application based on Expressjs to fetch blog posts and users from an external API with custom endpoint and response.

### Installation (docker)

~~~
$ git clone
$ cd interview-v2/
$ docker-compose build
~~~

### Installation

~~~
$ npm install
$ npm run build
~~~

### Usage

Launch server

~~~
$ npm run start
~~~

Launch application with Docker

~~~
$ docker-compose up -d
~~~

### API endpoints

| Method / Route        | Resource(s)           | Description  |
| --------------------- | ------------------ | ------------ |
| `GET` /posts      | Posts,Users | Fetch posts and their users |

The `/posts` route can receive extra parameters :

| Parameter        | Values/type           | Description  |
| --------------------- | ------------------ | ------------ |
| user_pos | eq,cancer,cap,arctic,antarctic | Search posts by user position |
| user | *int* | Search posts of a single user using user id |

### Response

The response follows the [Google JSON guide](https://google.github.io/styleguide/jsoncstyleguide.xml).

**Success response return data**

```json
{
  "data": [
    {
        "id": 1001,
        "name": "Wing"
    }
  ]
}
```

**Error response return error**

```json
{
  "error": {
    "code": 404,
    "message": "ID not found"
  }
}
```

Here is an example response for `/posts` :

```json
{
  "data": [
    {
      "id": 21,
      "title": "<h1>asperiores ea ipsam voluptatibus modi minima quia sint</h1>",
      "body": "<p>repellat aliquid praesentium dolorem quo\nsed totam minus non itaque\nnihil labore molestiae sunt dolor eveniet hic recusandae veniam\ntempora et tenetur expedita sunt</p>",
      "comments_count": 5,
      "user": {
        "id": 3,
        "firstname": "Clementine Bauch",
        "lastname": "Clementine Bauch",
        "email": "Nathan@yesenia.net",
        "geo": {
          "lat": "-68.6102",
          "lng": "-47.0653"
        }
      }
    }
  ]
}
```

### Architecture

The application fetch resources from an external REST API and formats the response for the end user.

![](https://i.imgur.com/vRJhQMP.png)

The Docker configuration is composed of 2 layers. It uses a node image to launch the app with Nginx.

-----

## Exercice

### Objectif

Créer une route d'API spécifique basée sur une API tierce.
 
### Sources

API externe : https://jsonplaceholder.typicode.com

### Un paramètre spécifique

Je dois être en mesure de récupérer des posts selon une position géographie.
Exemple : https://monapi.io/posts?pos=eq
Avec un URL de ce type, je devrais être en mesure de récupérer uniquement les posts ayant un créateur localisé au niveau de l'équateur.
Liberté totale sur la nomenclature et sur l'organisation de ce paramètre dans l'url (argument, post, get). 

## Rappels

La latitude sert à déterminer où se situe un point sur le globe par rapport  l'équateur. On part de l'équateur pour aller vers un des deux pôles afin de se positionner (de bas en haut et de haut en bas). On parle de latitude sud dans l'hémisphère sud, et de latitude nord dans l'hémisphère nord. La valeur de la prise entre 0 et 90 degrés.
 
#### Les 5 latitudes remarquables sont

- La latitude 0 ou équateur (latitude 0°)
- Le tropique du cancer (latitude 23° 27' nord)
- Le tropique du capricorne (latitude 23° 27' sud)
- Le cercle polaire arctique (latitude 66° 33' nord)
- Le cercle polaire antarctique (latitude 66° 33' sud)

-----

## Retours sur le test

Le test n'était pas très difficile, même si j'ai eu quelques problèmatiques. J'ai essayé de réflechir le plus loin possible pour ne pas produire quelque chose de simplement fonctionnel. J'ai donc documenté le projet et réflechis à l'architecture technique et les standards que j'allais utiliser. La principale difficulté était de manipuler l'api externe et d'utiliser les promesses. Étant donné que je n'ai que très peu pratiqué sur cette techno, il fallait que j'apprenne rapidement la syntaxe de l'orienté objet en js, le concept des promesses et de l'asynchrone. J'ai l'habitude de travailler sur des languages de programmation tel que php et python. Passer sur du node n'était pas chose facile surtout si en me plongeant directement dans le code.

#### Références

Liste des ressources qui m'ont principalement aidées.

- https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
- https://blog.risingstack.com/mastering-async-await-in-nodejs/
- https://stackoverflow.com/questions/40348171/es6-map-an-array-of-objects-to-return-an-array-of-objects-with-new-keys
- https://stackoverflow.com/questions/42489918/async-await-inside-arraymap
- https://futurestud.io/tutorials/node-js-how-to-run-an-asynchronous-function-in-array-map
- http://astro.unl.edu/naap/motion1/tc_units.html
