const dbService = require("./dbService");

function capitalizeFirstLetter(string) {
  return string
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
}

const fetchPopulation = async (request, reply) => {
  const state = capitalizeFirstLetter(request.params.state.toLowerCase());
  const city = capitalizeFirstLetter(request.params.city.toLowerCase());
  const dbResponse = dbService.fetchDataList();

  if (!dbResponse[state]) {
    return reply
      .status(400)
      .send({ error: "Bad Request", message: "State not found" });
  } else {
    try {
      let dbCity = Object.keys(dbResponse[state]).filter(
        (currentCity) =>
          capitalizeFirstLetter(currentCity.toLowerCase()) === city
      );
      if (dbCity.length > 0) {
        const population = dbResponse[state][dbCity[0]];
        return reply.status(200).send({ population });
      } else {
        return reply
          .status(400)
          .send({ error: "Bad Request", message: "City not found" });
      }
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
  console.log(state, city);
  if (!population || isNaN(population)) {
    return reply.status(400).send({ error: "Invalid population data" });
  }
  try {
    if (!dbResponse[state]) {
      dbResponse[state] = {};
      dbResponse[state][city] = parseInt(population);
      await dbService.updateDatalist(dbResponse);
      return reply.status(201).send({ message: "Data created" });
    } else {
      let dbCity = Object.keys(dbResponse[state]).filter(
        (currentCity) =>
          capitalizeFirstLetter(currentCity.toLowerCase()) === city
      );
      dbResponse[state][dbCity[0]] = parseInt(population);
      dbService.updateDatalist(dbResponse);
      return reply.status(200).send({ message: "Data update" });
    }
  } catch (error) {
    reply.status(500).send(error);
  }
};

module.exports = {
  fetchPopulation,
  updatePopulation,
};
