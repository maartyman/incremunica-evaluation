import {getAmountOfChanges} from "./utils/getAmountOfChanges";
import * as fs from "fs";

let basePath = "/home/maarten/Documents/doctoraat/code/incremunica-evaluation/data/final/users/maavdnbr/incremunica-train-benchmark/";

let cachedPath = basePath + 'data/cachedResults/';
let dataPath = "/users/maavdnbr/incremunica-train-benchmark/data/models/railway-inject-1-inferred.ttl"

fs.readdir(cachedPath, async (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  for (const file of files) {
    if (file.endsWith(".json")) {
      let totalAdditions = 0;
      let totalDeletions = 0;
      for (let i = 0; i < 6; i++) {
        let changes = await getAmountOfChanges(cachedPath + file, "batch", i);
        totalAdditions += changes.additions;
        totalDeletions += changes.deletions;
      }
      for (let i = 1; i < 6; i++) {
        let changes = await getAmountOfChanges(cachedPath + file, "inject", i);
        totalAdditions += changes.additions;
        totalDeletions += changes.deletions;
        changes = await getAmountOfChanges(cachedPath + file, "repair", i);
        totalAdditions += changes.additions;
        totalDeletions += changes.deletions;
      }
      console.log(file, totalAdditions, totalDeletions);
    }
  }
});
