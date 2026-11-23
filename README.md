# Tooling Systems — MongoDB Tasks API

A small Node.js REST API demonstrating a MongoDB connection, CRUD operations, dynamically selected environment configuration, and a Git Flow-based development process.

## Features

- Express 5 REST API with a Mongoose model.
- Task CRUD endpoints.
- Separate `staging`, `preprod`, and `prod` configuration modules.
- Dynamic environment selection with `APP_ENV`.
- Environment-specific secrets loaded from local `.env.<environment>` files.
- Request validation, consistent errors, and a health endpoint.
- Node's built-in test runner.
- Husky and Commitlint for conventional commit messages.

## Requirements

- Node.js 20 or later.
- npm.
- A MongoDB instance (local MongoDB or MongoDB Atlas).

## Installation

```bash
npm install
```

Copy the sample environment file to create one file per environment:

```bash
cp .env.example .env.staging
cp .env.example .env.preprod
cp .env.example .env.prod
```

Set `MONGODB_URI` in each file. Use a separate database or cluster for each environment. The default database names are:

| Environment | Default database | Default port |
| --- | --- | ---: |
| staging | tooling_systems_staging | 3000 |
| preprod | tooling_systems_preprod | 3001 |
| prod | tooling_systems_prod | 3002 |

You can override `MONGODB_DB_NAME` and `PORT` in the selected environment file. Do not commit real connection strings or credentials. The `.env` files are ignored by Git.

## Run the application

Start the staging environment:

```bash
APP_ENV=staging npm run dev
```

Start preprod:

```bash
APP_ENV=preprod npm run dev
```

Start prod:

```bash
APP_ENV=prod npm start
```

The application defaults to staging when `APP_ENV` is not set. The selected config module is imported dynamically by `src/config/index.js`. The MongoDB connection URI is read from the matching `.env.<environment>` file or from the process environment.

Health check:

```bash
curl http://localhost:3000/health
```

## API

Base URL: `http://localhost:<PORT>/api/tasks`

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/tasks` | List all tasks |
| GET | `/api/tasks/:id` | Get one task |
| POST | `/api/tasks` | Create a task |
| PATCH | `/api/tasks/:id` | Update task fields |
| DELETE | `/api/tasks/:id` | Delete a task |

Create a task:

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Set up MongoDB","description":"Connect the API to the staging database"}'
```

Update a task (replace the ID with one returned by the API):

```bash
curl -X PATCH http://localhost:3000/api/tasks/<TASK_ID> \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

## Quality checks

```bash
npm run lint
npm test
```

The tests cover environment selection and request validation. They do not require a running MongoDB instance.

## Git Flow

- `main`: production-ready code; protected by the repository ruleset.
- `develop`: integration branch.
- `feature/*`: feature work branched from `develop`.
- `release/*`: release preparation branched from `develop`.
- `hotfix/*`: urgent fixes branched from `main`.

Typical feature workflow:

```bash
git switch develop
git pull origin develop
git switch -c feature/short-description

# Make changes, then commit with a conventional message.
git add .
git commit -m "feat: describe the feature"

git push -u origin feature/short-description
```

Open a Pull Request from the feature branch into `develop`. Wait for `quality` and `build-and-test` to pass before merging.

When a release is ready, create a `release/<version>` branch from `develop`, validate it, and open a Pull Request into `main`. Merge the release back into `develop` when appropriate. Never push directly to protected `main`.

Example conventional commit types: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, and `ci`.
