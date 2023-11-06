import * as fs from 'fs';
import {getAmountOfChanges} from "./getAmountOfChanges";

export async function getCSV(basePath: string, config: any) {
  let path = basePath + config.resultsPath.slice(1);

  const csvString: string = await new Promise<any>((resolve, reject) => {
    fs.readFile(
      path,
      'utf8',
      (error, data) => {
        if (error) {
          reject(error);
        }
        try {
          resolve(data);
        } catch {
          reject("Parsing failed!");
        }
      },
    );
  });

  //operationName,isTransformation,runNr,transformationNr,queryTime(seconds),queryTime(nanoseconds),memoryUsed
  let csv = {};
  let csvLines = csvString.split("\n");
  let headers = csvLines.splice(0,1)[0].split(',');

  for (let line of csvLines) {
    if(!line) {
      continue
    }
    let parts = line.split(',');
    let operationName = csv[parts[0]];
    if (operationName == undefined) {
      operationName = {
        'isTransformation': parts[1]
      }
      csv[parts[0]] = operationName;
    }

    let data = operationName[parts[3]];
    if (data == undefined) {
      data = {
        'queryTime(seconds)': 0,
        'queryTime(nanoseconds)': 0,
        'memoryUsed': 0,
        'runs': 0
      }
      operationName[parts[3]] = data;
    }

    data['runs'] += 1;
    data['queryTime(seconds)'] += parseInt(parts[4]);
    data['queryTime(nanoseconds)'] += parseInt(parts[5]);
    data['memoryUsed'] += parseInt(parts[6]);
  }

  for (let operationName of Object.keys(csv)) {
    for (let transformationNr of Object.keys(csv[operationName])) {
      if (transformationNr === 'isTransformation') continue;
      let data = csv[operationName][transformationNr];

      data['queryTime(seconds)'] /= data['runs'];
      data['queryTime(nanoseconds)'] /= data['runs'];
      data['memoryUsed'] /= data['runs'];

      delete data['runs'];

      data['amountOfChanges'] = await getAmountOfChanges(basePath, operationName, parseInt(transformationNr), config);
    }
  }

  return csv;
}
