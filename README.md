# interview-v2

Fetch posts using a REST API.

### Installation

...

### Usage

...

### API endpoints

...
 
### Response

Example response for posts

```json
[
  {
    "title": "<h1>title</h1>",
    "body": "<p>body</p>",
    "user": {
      "id": 1,
      "firstname": "Raphael",
      "lastname": "Cerveaux",
      "email": "raphael@crvx.fr",
      "comments_count": 3,
      "geopos": "latitude 23° 27' sud"
    }
  },
  {
    "title": "<h1>title2</h1>",
    "body": "<p>body</p>",
    "user": {
      "id": 1,
      "firstname": "Raphael",
      "lastname": "Cerveaux",
      "email": "raphael@crvx.fr",
      "comments_count": 3,
      "geopos": "latitude 23° 27' sud"
    }
  }
]
```

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
