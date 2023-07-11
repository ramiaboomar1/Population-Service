const populationController = require("./controller/populationController");
const fastify = require("fastify")({
  logger: true,
});

fastify.get(
  "/api/population/state/:state/city/:city",
  async (request, reply) => {
    return populationController.fetchPopulation(request, reply);
  }
);

fastify.put("/api/population/state/:state/city/:city", (request, reply) => {
  populationController.updatePopulation(request, reply);
});

const start = async () => {
  try {
    await fastify.listen({ port: 5555 });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
