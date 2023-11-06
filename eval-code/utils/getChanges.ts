import * as fs from 'fs';

export async function getChanges(
  basePath: string,
  operationName: string,
  transformationNr: number,
  config?: any
) {
  let path: string;
  if (config === undefined) {
    path = basePath;
  } else {
    const pathArray = config.dataPath.split('/');
    path = basePath + `${config.cachedResultsBasePath +
    config.randomSeed}#${
      config.operationStings
        .map(str => str.replace(/[a-z]/gu, '')).join('#')}#${
      config.matchTransformPercentage}#${
      pathArray[pathArray.length - 1]}.json`;
  }

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

  let key = Object.keys(cachedResults).find(key =>
    key.startsWith(operationName) && key.endsWith(transformationNr.toString())
  )

  if (key === undefined) {
    return new Map<string, number>();
  }

  return new Map<string, number>(Object.entries(cachedResults[key]));
}
