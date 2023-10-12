import {getChanges} from "./extract-changes";

export async function getAmountOfChanges(basePath: string, config: any, operationName: string, transformationNr: number): Promise<{
  additions: number,
  deletions: number
}> {
  let changes = await getChanges(basePath, config, operationName, transformationNr);
  console.log(changes)

  let result = {
    additions: 0,
    deletions: 0
  }

  for (const [key, value] of changes) {
    if (value > 0) {
      result.additions += value;
    } else {
      result.deletions -= value;
    }
  }

  return result;
}

function test_getAmountOfChanges() {
  getAmountOfChanges(
    '/home/maarten/Documents/doctoraat/join paper eval/train-bencmark-2023-09-28-00-00',
    {
      "matchTransformPercentage": 30,
      "randomSeed": "incremunica",
      "queryEngineConfig": "/users/maavdnbr/incremunica-train-benchmark/data/configs/partial-hash-join/config.json",
      "dataPath": "/users/maavdnbr/incremunica-train-benchmark/data/models/railway-inject-1-inferred.ttl",
      "cachedResultsBasePath": "/users/maavdnbr/incremunica-train-benchmark/data/cachedResults/",
      "operationStings": [
        "BatchSwitchMonitored",
        "InjectSwitchMonitored",
        "RepairSwitchMonitored"
      ],
      "resultsPath": "/users/maavdnbr/incremunica-train-benchmark/results/resultsData/91bc22e7-835b-4165-b16f-3e83ceb3aa49.csv",
      "numberOfTransforms": 5,
      "runNr": -1
    },
    'repair switch monitored',
    2
  ).then((data) => {
    console.log(data)
  })
}
