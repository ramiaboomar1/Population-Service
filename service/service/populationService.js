const dbService = require("./dbService");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const fetchPopulation = async (request, reply) => {
  const state = capitalizeFirstLetter(request.params.state.toLowerCase());
  const city = capitalizeFirstLetter(request.params.city.toLowerCase());
  const dbResponse = dbService.fetchDataList();

  if (!dbResponse[state] || !dbResponse[state][city]) {
    return reply
      .status(400)
      .send({ error: "Bad Request", message: "City not found" });
  } else {
    try {
      const population = dbResponse[state][city];
      return reply.status(200).send({ population });
    } catch (error) {
      reply.status(500).send(error);
    }
  }
};

const updatePopulation = async (request, reply) => {
  const state = capitalizeFirstLetter(request.params.state.toLowerCase());
  const city = capitalizeFirstLetter(request.params.city.toLowerCase());
  const population = request.body;
  const dbResponse = dbService.fetchDataList();

  if (!population || isNaN(population)) {
    return reply.status(400).send({ error: "Invalid population data" });
  }
  try {
    if (!dbResponse[state]) {
      dbResponse[state] = {};
    }

    if (dbResponse[state][city]) {
      dbResponse[state][city] = parseInt(population);
      dbService.updateDatalist(dbResponse);
      return reply.status(200).send({ message: "Data update" });
    }

    dbResponse[state][city] = parseInt(population);
    await dbService.updateDatalist(dbResponse);
    return reply.status(201).send({ message: "Data created" });
  } catch (error) {
    reply.status(500).send(error);
  }
};

module.exports = {
  fetchPopulation,
  updatePopulation,
};
