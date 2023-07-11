const populationService = require("../service/populationService");

const fetchPopulation = async (request, reply) => {
  return populationService.fetchPopulation(request, reply);
};

const updatePopulation = async (request, reply) => {
  return populationService.updatePopulation(request, reply);
};

module.exports = {
  fetchPopulation,
  updatePopulation,
};
