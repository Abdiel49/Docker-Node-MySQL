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
import `Node-MySQL.postman_collection.json` in postman and use 

## Run NodeJS and Database at same docker compose

the HOST value of your database must be one of the following:
- the service name if your service does not have `container_name` configured.
- use the value of `container_name` if you have configured it


```yml
version: '3.8'
name: test
services:
  database: # <- name of database service
    image: postgres:14 
    container_name: mysql-db # name of service set to `mysql-db`
    environment: ...
      
    volumes:
      - ./db-data:/var/lib/postgresql/data
    ports:
      - "${POSTGRES_PORT}:5432"

  server:
    build: .
    ...
```
In our example we have configured `container_name` so we must use the value of `mysql-db` as HOST of our database in the `.env` file configuration.

```.env
NODE_PORT=3000

# postgres
POSTGRES_USER="root"
POSTGRES_PASSWORD="passwrod"
POSTGRES_DATABASE="test"
POSTGRES_HOST="mysql-db" # <- add here 'mysql-db'
POSTGRES_PORT="5432"
```

Or set up in your database connection file

```js
const client = new pg.Client({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  host: process.env.POSTGRES_HOST || 'mysql-db',
  port: process.env.POSTGRES_PORT,
});
```
