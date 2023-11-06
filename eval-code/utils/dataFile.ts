import * as fs from "fs";

export function saveDataFile(obj: any) {
  fs.writeFile('data.json', JSON.stringify(obj), 'utf8', (err) => {
    console.log(err);
  });
}

export function loadDataFile(): any {
  return require('../../data.json');
}
