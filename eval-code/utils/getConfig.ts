import * as fs from 'fs';

export async function getConfig(basePath: string, fileName: string) {
  const config = await new Promise<any>((resolve, reject) => {
    fs.readFile(
      basePath + 'users/maavdnbr/incremunica-train-benchmark/results/benchmarkConfigs/' + fileName,
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

  return config;
}
