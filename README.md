# SmartApart – Apartment Rental System

## Project Description

SmartApart is a simple apartment rental management system developed to help users browse apartments, register or log in, create bookings, and send inquiries. The project also includes an admin area where the main apartment data can be managed. The goal of the system is to provide a basic but functional flow for apartment listing and reservation management.

## Main Users

The main users of the system are:

- Visitors who want to browse available apartments
- Registered users who want to create bookings
- Admin who manages apartments, bookings, users, and inquiries

## Main Features

The main features included in the project are:

- View available apartments
- Register and log in
- Create bookings
- Send inquiries
- Admin apartment management
- Basic admin dashboard overview

## Project Structure

The project is organized into the following main parts:

- `config/` – database connection configuration
- `UI/frontend/` – frontend pages, styles, and JavaScript files
- `UI/routes/` – backend routes for system modules
- `docs/` – documentation files for project analysis and improvements
- `README.md` – main project overview and setup guide

## Technologies Used

This project is built with:

- Node.js
- Express.js
- PostgreSQL
- HTML
- CSS
- JavaScript

## How to Run the Project

To run the project locally, follow these steps:

1. Clone the repository
2. Open the project in VS Code
3. Install dependencies with:

```bash
npm install
```

4. Make sure PostgreSQL is running on your computer.
5. Open pgAdmin and verify that your database is available.
6. Update the database connection inside `config/db.js` if needed.
7. Start the project with:

```bash
npm start
```

8. Open the application in the browser at:

```text
http://localhost:3000
```

## Database Setup

The project uses PostgreSQL for storing apartment data.

Make sure your database connection is correctly configured in:

```text
config/db.js
```

Example configuration:

```js
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "1234",
  port: 5432,
});

module.exports = pool;
```

To create the `apartments` table, run this SQL query in pgAdmin:

```sql
CREATE TABLE IF NOT EXISTS apartments (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    address VARCHAR(200) NOT NULL,
    price_per_month NUMERIC(10,2) NOT NULL,
    bedrooms INTEGER NOT NULL,
    bathrooms INTEGER NOT NULL
);
```

## Improvements Added

This version of the project includes the following improvement sprint changes:

1. Better code organization in the admin apartment flow
2. Better input validation and clearer error handling
3. Better documentation through:
   - `docs/project-audit.md`
   - `docs/improvement-report.md`

## Documentation Files

The project now includes additional documentation files:

- `docs/project-audit.md` – explains the current state of the project, strengths, weaknesses, and planned improvements
- `docs/improvement-report.md` – explains the implemented improvements and why they matter
- `docs/architecture.md` – describes the basic structure of the system
- `docs/implementation.md` – describes implementation details of the project

## Current Limitations

Even after these improvements, the project still has some limitations:

- The project still needs more testing
- Some UI flows can be improved further
- Security can be strengthened more
- Documentation can still be expanded with more screenshots and technical details

## Conclusion

SmartApart is a functional student project that demonstrates the core idea of an apartment rental system. Besides implementing the main system flow, this project also focuses on analyzing weaknesses, improving reliability, and documenting the work in a clearer and more professional way.
