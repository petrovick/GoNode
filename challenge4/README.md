# Application Setup

You should first run the npm to install all dependencies needed for the project

```bash
npm install
```

## Environment Setup

You should create a new file called ".env" and copy ".env.example" content to it(Make sure to set the variables according to your environment, docker is recommended for Redis and Postgres database)

Run the following commands on Terminal to create the redis and postgres database environment

```bash
docker run --name redis -p 6379:6379 -d redis:alpine
```

```bash
docker run --name database -p 5432:5432 -d -t kartoza/postgis
```

## Database Setup

Go to your database and create a new database called "challenge4"(according to your .env file)

```bash
create database challenge4
```

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

### Running the app

```js
adonis serve --dev
```
