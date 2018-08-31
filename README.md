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

| Method / Route        | Resource           | Description  |
| --------------------- | ------------------ | ------------ |
| `GET` /posts      | Posts,Users | Fetch posts and their users |

The `/posts` route can receive extra parameters :

| Parameter        | Values/type           | Description  |
| --------------------- | ------------------ | ------------ |
| user_pos | eq,cancer,cap,arctic,antarctic | Search posts by user position |
| user | *int* | Search posts of a single user using user id |

A bad value will result in an error.

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
            "id": 1,
            "title": "<h1>sunt aut facere repellat provident occaecati excepturi optio reprehenderit</h1>",
            "body": "<p>quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto</p>",
            "user": {
                "id": 1,
                "firstname": "Raphael",
                "lastname": "Cerveaux",
                "email": "raphael@crvx.fr",
                "comments_count": 3,
                "pos": {
                    "lat": "-37.3159",
                    "lng": "81.1496"
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

Le test n'était pas très difficile. J'ai essayé de réflechir le plus loin possible pour ne pas produire quelque chose de simplement fonctionnel. J'ai donc documenté le projet et réflechis à l'architecture technique et les standards que j'allais utiliser. La principale difficulté était de mettre en place l'architecture du code sous nodejs pour qu'il soit flexible. Étant donné que je n'ai que très peu pratiqué sur cette techno, il fallait que j'apprenne rapidement la syntaxe de l'orienté objet en js.
