const fs = require("fs");

const fetchDataList = () => {
  try {
    let data = fs.readFileSync("./data/data.json");
    let populationData = JSON.parse(data);
    return populationData;
  } catch (error) {
    throw Error("Error fetching data");
  }
};

const updateDatalist = async (updatedPopulation) => {
  try {
    let stringifyData = JSON.stringify(updatedPopulation);
    fs.writeFileSync("./data/data.json", stringifyData);
    return { status: 200 };
  } catch (error) {
    throw Error("Error updating data");
  }
};

module.exports = {
  fetchDataList,
  updateDatalist,
};
