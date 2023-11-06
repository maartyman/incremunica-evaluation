import os
import json
import pandas as pd

# Specify the folder where your JSON files are located
base_path = '/home/maarten/Documents/doctoraat/code/incremunica-evaluation/data/final'
folder_path = base_path + '/users/maavdnbr/incremunica-train-benchmark/results/benchmarkConfigs'

# Loop through all files in the folder
#for filename in os.listdir(folder_path):
#    if filename.endswith('.json'):
#        file_path = os.path.join(folder_path, filename)

file_path = folder_path + '/computational-bind-join_Fri, 06 Oct 2023 11:24:52 GMT-52,459.json'

# Read and parse the JSON data from the file
with open(file_path, 'r') as file:
    json_data = json.load(file)

# Extract and print the "resultsPath" from the JSON data
results_path = json_data.get("resultsPath")
if results_path is not None:
    full_results_path = base_path + results_path
    csv_df = pd.read_csv(full_results_path)
    print(full_results_path)
    print(csv_df)
    averaged_df = csv_df.groupby(['operationName', 'isTransformation', 'transformationNr'])[[
        'queryTime(seconds)',
        'queryTime(nanoseconds)',
        'memoryUsed'
    ]].mean()

    averaged_df.reset_index(inplace=True)

    # Display the resulting DataFrame
    print(averaged_df)

