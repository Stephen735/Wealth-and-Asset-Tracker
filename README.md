# Wealth & Asset Tracker
Personal finance tracker refactored to run on a Node.js and Express server.

## Features
- Log income and expense transactions
- View a live summary of income, expenses, and net balance
- Delete transactions
- Data is stored server-side and fetched on page load

## How to Run
Install dependencies and start the server:
```
npm install
node server.js
```
Then open `http://localhost:3000` in a browser.

## Tech Used
- Node.js and Express for the server
- RESTful API routes (GET, POST, DELETE)
- Vanilla JavaScript with fetch() for client-server communication
- express.static() to serve frontend files

