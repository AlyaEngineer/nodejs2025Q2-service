# <h1 align="center">Home Library Service</h1>

## Description
This project is a RESTful API service for managing a personal media library (users, tracks, albums, artists, and favorites). It created as part of the RS School [Node.js course](https://rs.school/courses/nodejs).
Built with NestJS, TypeScript, PostgreSQL and Prisma ORM.
The application is fully containerized with Docker.

## Install and Run the Application
### 🛠 Technical requirements
- Use 24.x.x version (24.10.0 or upper) of [Node.js](https://nodejs.org/en/download).
- Install [Docker](https://docs.docker.com/engine/install/) locally.

### 🚀 Run locally

- Clone the repository from GitHub:

```bash
git clone https://github.com/AlyaEngineer/nodejs2025Q2-service.git
```

- Go to the development branch:

```bash
git switch part-2
```

- Create an `.env` file in the root directory of the project. You can use the provided `.env.example` as a template:

```bash
cp .env.example .env
```

- Open the `.env` file and fill in the required environment variables:

```bash
PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_HOST=
DB_PORT=
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public
```

- Install dependencies:

```bash
npm ci
```

- Start the server:

```bash
npm run start
```

- Run all tests:

```bash
npm run test
```

- Run the scan:

```bash
npm run scan
```

### 🐳 Build and run with Docker:
1. Build and start containers:

```bash
docker compose up --build
```


- REST API endpoint: http://localhost:4000
- Swagger UI documentation: http://localhost:4000/doc


2. To check out the size of the Docker images

```bash
docker images
```

3. Stop containers
```bash
docker compose down
```

### 📦 DockerHub Image

Ready-to-use built image: https://hub.docker.com/r/allatsaiukova/music_library_service

Download the image:

```bash
docker pull allatsaiukova/music_library_service:v1.0.0
```

