import * as fs from 'fs';

export async function getChanges(basePath: string, config: any, operationName: string, transformationNr: number) {
  const pathArray = config.dataPath.split('/');
  let path = basePath + `${config.cachedResultsBasePath +
  config.randomSeed}#${
    config.operationStings
      .map(str => str.replace(/[a-z]/gu, '')).join('#')}#${
    config.matchTransformPercentage}#${
    pathArray[pathArray.length - 1]}.json`;


  const cachedResults = await new Promise<any>((resolve, reject) => {
    fs.readFile(
      path,
      'utf8',
      (error, data) => {
        if (error) {
          reject(error);
        }
        try {
          resolve(JSON.parse(data));
        } catch {
          reject("Parsing failed!");
        }
      },
    );
  });

  return new Map<string, number>(Object.entries(cachedResults[operationName + transformationNr]));
}
