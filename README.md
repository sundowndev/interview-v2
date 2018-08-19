# interview-v2

## Exercice

### Objectif

Créer une route d'API spécifique basée sur une API tierce.
 
### Sources

API externe : https://jsonplaceholder.typicode.com 
 
### Éléments requis
La structure du JSON final
- Tous les posts avec :
    - les infos du post avec quelques modifications :
   	 - title avec balises h1
   	 - body sous forme d'un paragraphe html valide
    - le créateur du post, uniquement :
   	 - id
   	 - nom
   	 - prénom
   	 - email
    - le nombre de commentaires
    - la position géographique des créateurs des posts par rapport aux 5 grandes latitudes
 
### Un paramètre spécifique

Je dois être en mesure de récupérer des posts selon une position géographie.
Exemple : https://monapi.io/posts?pos=eq
Avec un URL de ce type, je devrais être en mesure de récupérer uniquement les posts ayant un créateur localisé au niveau de l'équateur.
Liberté totale sur la nomenclature et sur l'organisation de ce paramètre dans l'url (argument, post, get). 

## Rappels

La latitude sert à déterminer où se situe un point sur le globe par rapport  l'équateur. On part de l'équateur pour aller vers un des deux pôles afin de se positionner (de bas en haut et de haut en bas). On parle de latitude sud dans l'hémisphère sud, et de latitude nord dans l'hémisphère nord. La valeur de la prise entre 0 et 90 degrés.
 
Les 5 latitudes remarquables sont
la latitude 0 ou équateur (latitude 0°)
le tropique du cancer (latitude 23° 27' nord)
le tropique du capricorne (latitude 23° 27' sud)
le cercle polaire arctique (latitude 66° 33' nord)
le cercle polaire antarctique (latitude 66° 33' sud)
