
# Logbook Generator

This is a web application that lets you create and manage your internship logbooks



## Features

- Light/dark mode toggle
- Live previews
- Download in .docx or .pdf 
- Cross platform compatible

## Tech Stack

- **Client:** React, TailwindCSS

- **Server:** Node, Express, Sequelize

- **DataBase** Mysql
## Requirements
- mysql
- nodejs
- nodemon
- vitejs
## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```
|
### client side
Go to the project directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

Run the project

```bash
  npm run dev
```
|
### server side

Go to project directory

```bash
  cd backend
```

Create the project database
```bash
  mysql -u root -p
  > source absolute-path-to-repository/backend/src/configs/db-schema.sql
```


Setup your enviromental variables in a .env file
```bash
  echo "DB_NAME = 'logr-db'" >> .env
  echo "DB_USER = your_database_username" >> .env
  echo "DB_PASSWORD = your_database_password" >> .env
  echo "DB_HOST = 'localhost'" >> .env
  echo "SERVER_PORT = 3000" >> .env
  echo "JWT_SECRET = your_jwt_secret_string" >> .env
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm server.js
```
