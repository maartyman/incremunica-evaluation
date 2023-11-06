import {getAllConfigs} from "./utils/getAllConfigs";
import {getCSV} from "./utils/getCSV";
import {saveDataFile} from "./utils/dataFile";

export async function makeDataFile() {
  let basePath = '/home/maarten/Documents/doctoraat/code/incremunica-evaluation/data/final/';

  let configs = await getAllConfigs(basePath);

  let data = {};

  for (const config of configs) {
    let joinTechniqueArray = (<string> config['queryEngineConfig']).split("/");
    let joinTechnique = joinTechniqueArray[joinTechniqueArray.length - 2];
    let datasetNameArray = (<string> config['dataPath']).split("/");
    let datasetName = datasetNameArray[datasetNameArray.length - 1];
    let operationName = (<string> config['operationStings'][0]).replace('Batch', '');

    if (data[joinTechnique] === undefined) {
      data[joinTechnique] = {};
    }
    if (data[joinTechnique][datasetName] === undefined) {
      data[joinTechnique][datasetName] = {};
    }
    if (data[joinTechnique][datasetName][operationName] === undefined) {
      data[joinTechnique][datasetName][operationName] = {};
    }

    let csv = await getCSV(basePath, config);

    data[joinTechnique][datasetName][operationName]['config'] = config;
    data[joinTechnique][datasetName][operationName]['results'] = csv;
  }

  saveDataFile(data);
}

makeDataFile()


/*
let temp = {};

for (const config of configs) {
  let dataPathArray = config.dataPath.split('/');
  let temp1 = temp[dataPathArray[dataPathArray.length - 1]];
  if (!temp1) {
    temp1 = {};
    temp[dataPathArray[dataPathArray.length - 1]] = temp1;
  }

  let queryEngineConfigArray = config.queryEngineConfig.split('/');
  let temp2 = temp1[queryEngineConfigArray[queryEngineConfigArray.length - 2]];
  if (!temp2) {
    temp2 = {};
    temp1[queryEngineConfigArray[queryEngineConfigArray.length - 2]] = temp2;
  }

  let temp3 = temp2[config.operationStings[0]];
  if (!temp3) {
    temp3 = (await getCSV(basePath, config)).size();
    temp2[config.operationStings[0]] = temp3;
  }
  else {
    console.log("problem")
  }
}

for (const tempKey in temp) {
  console.log(tempKey);
  let temp1 = temp[tempKey];
  for (const temp1Key in temp1) {
    console.log("\t" + temp1Key);
    let temp2 = temp1[temp1Key];
    for (const temp2Key in temp2) {
      console.log("\t\t" + temp2Key);
      console.log("\t\t\t" + temp2[temp2Key]);
    }
  }
}

 */
