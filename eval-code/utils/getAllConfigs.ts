import * as fs from 'fs';
import {getConfig} from "./getConfig";

export async function getAllConfigs(basePath: string) {
  return await new Promise<any[]>((resolve, reject) => fs.readdir(
    basePath + 'users/maavdnbr/incremunica-train-benchmark/results/benchmarkConfigs/',
    async (err, files) => {
      if (err) {
        reject(err);
      }
      let configs = [];
      for (const file of files) {
        if (file !== "latest") {
          configs.push(await getConfig(basePath, file));
        }
      }
      resolve(configs);
    }
  ));
}
