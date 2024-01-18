# Job Hunter

Job Hunter is a powerful job search tool designed to streamline the process of finding employment opportunities. This project is built using Node.js and consists of two main components: `job-hunter-api` for the backend and `job-hunter-app` for the frontend.

## job-hunter-api

### Getting Started

To run the API, navigate to the `job-hunter-api` directory and use the following commands:

1. Create a `.env` file in the `job-hunter-api` directory with the following variables:

```env
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_database
SECRET_TOKEN=your_secret_token
```

Replace `your_db_host`, `your_db_port`, `your_db_username`, `your_db_password`, `your_db_database`, and `your_secret_token` with your actual database connection details and the secret token for accessing the platform.

2. Install dependencies and start the API server:

```bash
# Install dependencies
npm install

# Start the API server
npm run start:api
```

### Running Tests

To execute unit tests, use the following command:

```bash
# Run unit tests
npm test
```

### Crawling Job Listings

To perform a web crawl for job listings, use the following command:

```bash
# Run job crawlers
npm run start:crawlers
```

### Customizing Scrapers and Ratings

If you wish to customize the tool for specific job platforms or adjust skill ratings, you can find the relevant files in the `job-hunter-api/src/scrapers` and `job-hunter-api/src/analyzer` directories.

#### Scrapers

Each job platform has its own scraper file within the `job-hunter-api/src/scrapers` directory. To customize the URLs used for job searches, locate the appropriate scraper file and modify the URLs as needed.

#### Skill Ratings

The skill ratings used for job analysis are defined in the `job-hunter-api/src/analyzer/ratings.ts` file. Adjust the values associated with each skill to tailor the scoring system to your preferences.

## job-hunter-app

The frontend of the Job Hunter tool is developed using React. To launch the application, navigate to the `job-hunter-app` directory and use the following commands:

1. Create a `.env` file in the `job-hunter-app` directory with the following variable:

```env
REACT_APP_API_BASE_URL=http://localhost:your_api_port
```

Replace `your_api_port` with the port where your API server is running.

2. Install dependencies and start the frontend application:

```bash
# Install dependencies
npm install

# Start the frontend application
npm start
```

## Contact Information

For inquiries or further information, you can reach me via:

- Email: ferreirasara1501@gmail.com
- LinkedIn: [LinkedIn Profile](https://www.linkedin.com/in/ferreirasara1501)