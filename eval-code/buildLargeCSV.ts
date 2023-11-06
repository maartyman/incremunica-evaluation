import {loadDataFile} from "./utils/dataFile";
import * as fs from "fs";

let headers = [
  'joinAlgorithm',
  'datasetName',
  'matchTransformPercentage',
  'scenarioName',
  'operationName',
  'isTransformation',
  'transformationNr',
  'amountOfAdditions',
  'amountOfDeletions',
  'queryTime(seconds)',
  'queryTime(nanoseconds)',
  'memoryUsed',
]

let data = loadDataFile();
let csvString = '';
csvString += headers.join(',') + '\n';
for (const joinAlgorithm of Object.keys(data)) {
  for (const datasetName of Object.keys(data[joinAlgorithm])) {
    for (const scenarioName of Object.keys(data[joinAlgorithm][datasetName])) {
      for (const operationName of Object.keys(data[joinAlgorithm][datasetName][scenarioName]['results'])) {
        for (const transformationNr of Object.keys(data[joinAlgorithm][datasetName][scenarioName]['results'][operationName])) {
          if (transformationNr === 'isTransformation') continue;
          let result = data[joinAlgorithm][datasetName][scenarioName]['results'][operationName][transformationNr];
          let datasetNameShortTemp = datasetName.split('.')[0].split('-');
          let datasetNameShort = datasetNameShortTemp[1] + '-' + datasetNameShortTemp[2];
          csvString += `${joinAlgorithm},${datasetNameShort},${data[joinAlgorithm][datasetName][scenarioName]["config"]["matchTransformPercentage"]},${scenarioName},${operationName},${data[joinAlgorithm][datasetName][scenarioName]['results'][operationName]['isTransformation']},${transformationNr},${result['amountOfChanges']['additions']},${result['amountOfChanges']['deletions']},${result['queryTime(seconds)']},${result['queryTime(nanoseconds)']},${result['memoryUsed']}\n`;
        }
      }
    }
  }
}

fs.writeFileSync('data.csv', csvString);
