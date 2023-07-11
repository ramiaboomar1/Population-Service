# Population-Service

This is a population service built using Node.js. It allows you to retrieve and update population data for different states and cities.

## Requirements

- Node.js v18
- Plain JavaScript (no TypeScript)
- Run `npm install` to install necessary dependencies
- Run `npm start` to start the service and all its required components
- The service will run on port `5555`
- Data must persist

## Routes

### GET /api/population/state/:state/city/:city

This route allows you to retrieve population data for a specific state and city.

- Parameters:

  - `:state` - State name (case insensitive)
  - `:city` - City name (case insensitive)

- Response:
  - If the state and city combination is found, the response will have a status code of 200 and a JSON object with the population data. For example: `{"population": 32423}`
  - If the state and city combination cannot be found, the response will have a status code of 400 and a proper error message.

Example usage: `GET http://127.0.0.1:5555/api/population/state/Florida/city/Orlando`

### PUT /api/population/state/:state/city/:city

This route allows you to update population data for a specific state and city.

- Parameters:

  - `:state` - State name (case insensitive)
  - `:city` - City name (case insensitive)

- Request Body:

  - Plain text containing the number to be set as the population.

- Response:
  - If the data could not be added, the response will have a status code of 400 and a proper error message.
  - If the data updates an existing state and city combination, the response will have a status code of 200.
  - If the data creates a new state and city combination, the response will have a status code of 201.

Example usage: `PUT http://127.0.0.1:5555/api/population/state/Florida/city/Orlando`

## Installation and Execution

1. Ensure you have Node.js v18 installed.
2. Clone the repository or download the source code.
3. Open a terminal or command prompt and navigate to the project directory.
4. Run `npm install` to install the necessary dependencies.
5. Run `npm start` to start the service and all required components.
6. The service will now be running on port `5555`.
7. You can now make requests to the provided routes using a tool of your choice (e.g., cURL, Postman).

Note: Ensure that the required dependencies are successfully installed and there are no port conflicts before running the service.

## Persistence

The service is designed to persist data. The details about how data is stored and managed are not provided in this README file. However, the service is responsible for maintaining data integrity and persistence across service restarts.

If you have any further questions or need assistance, please feel free to reach out.
