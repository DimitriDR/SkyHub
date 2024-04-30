# SkyHub
## Description
API permettant d'accéder à des données (fictives) sur l'aviation.

## Note pour la documentation
La documentation se trouve dans le dossier `./docs` au format brut YAML.
Autrement, il est possible d'y accéder directement via `http://localhost:4000/api-docs/` du serveur.

Une copie est présente dans le `./back` pour que le endpoint puisse être pleinement intégré dans le serveur.

## Installation
Comme demandé, le projet est disponible sous la forme d'un Docker Compose.
Un exemple est disponible ici : [docker-compose.yml](docker/docker-compose.yaml).
En se plaçant à la racine du projet, il est possible de l'exécuter en lançant directement par la commande :

```bash
sudo docker-compose -p skyhub -f docker/docker-compose.yaml up
```

Note : `sudo` peut être requis selon la configuration de Docker.

Quelques informations sur le `docker-compose.yaml`:

```yaml
version: "3.9"

services:
  api-server:
    image: dimitridr/skyhub-server:latest
    container_name: SkyHub-API
    environment:
      DB_HOSTNAME: SkyHub-DB  # Le nom ligne 16 doit être reporté ici, autrement notre conteneur ne sait pas l'adresse IP de notre base de données
    ports:
      - "4000:4000" # On peut choisir n'importe quel port pour l'hôte, mais Postman a été configuré pour le port 4000
    depends_on:
      - db

  db:
    image: dimitridr/skyhub-db:latest
    container_name: SkyHub-DB
    ports:
      - "55055:27017"
```

L'image `dimitridr/skyhub-server:latest` est l'image du serveur de l'API, qui supporte une variable d'environnement mais
**obligatoire** pour un fonctionnement correct. `DB_HOSTNAME` doit être le nom du conteneur de la base de données. Dans le
cas de l'exemple, il s'agit de `SkyHub-DB`. En indiquant ce nom, NodeJS va pouvoir utiliser le Magic DNS de Docker pour
récupérer l'adresse IP de la base de données. Sans cela, l'API tenterait de se connecter à `localhost` et échouerait.

On notera que notre API écoute sur le port 4000, mais est ici pour la démonstration, exposée sur le port 3000, on peut
choisir le port qu'on veut pourvu qu'il soit disponible. Idem pour la base de données, qui écoute sur le port 27017,
mais
est exposée sur le port 55055. Il n'est d'ailleurs pas nécessaire de l'exposer pour que SkyHub fonctionne, mais cela
peut être utile pour s'y connecter directement et voir les données brutes.