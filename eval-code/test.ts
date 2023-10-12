import * as fs from 'fs';

export async function getChanges() {
    let path = '/home/maarten/Documents/doctoraat/join paper eval/eval-code/test.csv';

    const data = await new Promise<string>((resolve, reject) => {
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

    let count = 0;
    for (const line of data.split("\n").slice(1,-1)) {
      console.log(parseInt(line.split(",")[4]));
      count += parseInt(line.split(",")[4]);
    }
    console.log(count)
}

getChanges()
