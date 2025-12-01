# <h1 align="center">Home Library Service</h1>

## Description
This project is a RESTful API service for managing a personal media library (users, tracks, albums, artists, and favorites). It created as part of the RS School [Node.js course](https://rs.school/courses/nodejs).
All data is stored in memory, and the architecture is prepared for easy migration to a real database in future tasks. Built with NestJS and TypeScript.

## Install and Run the Application

- Clone the repository from GitHub:

```bash
git clone https://github.com/AlyaEngineer/nodejs2025Q2-service.git
```

- Go to the development branch:

```bash
git switch part-1
```

- Install the dependencies:

```bash
npm install
```

- Create an `.env` file in the root directory of the project. You can use the provided `.env.example` as a template:

```bash
cp .env.example .env
```

- Open the `.env` file and fill in the required environment variables:

```bash
PORT=value_of_port
```

- Start the server:

```bash
npm run start
```

- Run all tests:

```bash
npm run test
```

**Interactive documentation will be available at the following URL: [http://localhost:4000/doc](http://localhost:4000/doc).**
