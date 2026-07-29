# Job Hunter

Job Hunter is a personal job-search dashboard that collects job listings from multiple platforms, analyzes them for skills and benefits, stores them in PostgreSQL, and provides a React UI for reviewing, filtering, applying, discarding, and tracking opportunities.

The repository is split into two TypeScript projects:

- `job-hunter-api`: Express API, PostgreSQL persistence with TypeORM, job scrapers, and job analysis.
- `job-hunter-app`: Vite + React frontend for browsing jobs and viewing application statistics.

## Features

- Scrapes job opportunities from multiple job boards.
- Detects skills, benefits, job type, hiring regime, seniority, and ratings from job descriptions.
- Stores opportunities in PostgreSQL and avoids duplicates by company/title.
- Filters and sorts jobs by platform, type, hiring regime, skills, benefits, title, company, seniority, rating, and status.
- Tracks applied, discarded, and recused jobs.
- Tracks number of interviews and tests for applied jobs.
- Displays statistics by platform, company, rating, job type, hiring regime, skills, and benefits.
- Protects API access with a shared secret token.

## Tech Stack

- Node.js
- TypeScript
- Express
- PostgreSQL
- TypeORM
- Puppeteer
- Jest
- React
- Vite
- Ant Design
- TanStack Query
- Zustand
- Recharts

## Project Structure

```text
.
|-- job-hunter-api/     # Backend API, scrapers, analyzer, database entities
|-- job-hunter-app/     # Frontend React application
|-- LICENSE
`-- README.md
```

## Prerequisites

- Node.js and npm
- PostgreSQL
- A PostgreSQL database created for the app

## Backend Setup

From the API directory:

```bash
cd job-hunter-api
npm install
```

Create `job-hunter-api/.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=job_hunter
SECRET_TOKEN=your_secret_token
```

Optional Telegram notifications can be enabled with:

```env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
```

Start the API:

```bash
npm run start:api
```

The API runs at:

```text
http://localhost:8080
```

## Frontend Setup

From the app directory:

```bash
cd job-hunter-app
npm install
```

Create `job-hunter-app/.env`:

```env
VITE_APP_API_BASE_URL=http://localhost:8080
```

Start the frontend:

```bash
npm start
```

Vite will print the local URL, usually:

```text
http://localhost:5173
```

When you open the app, sign in with the same value configured as `SECRET_TOKEN` in the API `.env` file.

## Common Commands

### API

```bash
cd job-hunter-api

npm run start:api        # Start the API in development mode
npm run start:scrapers   # Run the job scrapers
npm run start:analyzer   # Re-run job analysis
npm run build            # Compile TypeScript
npm test                 # Run Jest tests
npm run eslint:check     # Check linting
npm run lint:fix         # Fix linting issues
```

### App

```bash
cd job-hunter-app

npm start        # Start Vite dev server
npm run build    # Type-check and build for production
npm run preview  # Preview the production build locally
```

## API Routes

All routes expect the secret token in the `Authorization` header.

```text
GET  /jobs          List jobs with pagination, filters, sorting, skills, benefits, and ratings
POST /job/:uuid     Update a job status or counters
GET  /stats         Get dashboard statistics
POST /validate      Validate the secret token
POST /run-scrapers  Trigger all scrapers
```

`GET /jobs` requires `limit` and `page` query parameters.

Example:

```bash
curl "http://localhost:8080/jobs?limit=10&page=0" \
  -H "Authorization: your_secret_token"
```

## Customization

Scrapers live in:

```text
job-hunter-api/src/scrapers
```

Search URLs live in:

```text
job-hunter-api/src/urls/urls.ts
```

Analyzer regex rules and ratings live in:

```text
job-hunter-api/src/analyzer/regex.ts
job-hunter-api/src/analyzer/ratings.ts
```

Update those files to add job platforms, change search targets, or tune how skills and benefits are detected and scored.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Contact

- Email: ferreirasara1501@gmail.com
- LinkedIn: [Sara Ferreira](https://www.linkedin.com/in/ferreirasara1501)
