# Node - MySQL - Notes

## MySQL - Docker

Run:

```sh
$ docker build -t mysql-db -f Dockerfile-mysql .
$ docker run -d --name mysql-test123 -e MYSQL_ROOT_PASSWORD=password -p 3333:3306 mysql-db
```

### MySQL - connect 
Connect using user ('root'), password and 'database_name' 

Run: 

```sh
$ docker ps
CONTAINER ID   IMAGE      COMMAND                  CREATED             STATUS             PORTS                               NAMES
cf30bf29c90d   mysql-db   "docker-entrypoint.s…"   About an hour ago   Up About an hour   0.0.0.0:3306->3306/tcp, 33060/tcp   mysql-container

$ bas
Enter password:
Welcome to the MySQL monitor.
# ...
```

### MySQL - commands

```bash
mysql> show databases;
mysql> use notes_db;
mysql> show tables;
mysql> SELECT * FROM Note;
mysql> exit
```

## Node - Local

```sh
$ npm install
$ npm start
Servidor escuchando en http://localhost:3000
Conexión exitosa a la base de datos MySQL
Tabla Note creada correctamente
```

## Node - Docker

```sh
$ docker build -t node-app .
$ docker run -d --name node-c -p 3000:3000 --link mysql-container:mysql node-app
```

## Postman
import `Node-MySQL.postman_collection.json` in postman and use endpoints