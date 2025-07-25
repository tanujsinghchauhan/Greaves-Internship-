import csv
import json

csv_file = r'C:\ddata\referencebooks\tl365\Airports2.csv'
json_file = r'C:\ddata\referencebooks\tl365\Airports2_1000.json'

data = []
with open(csv_file, encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for i, row in enumerate(reader):
        if i >= 10000:
            break
        data.append(row)

with open(json_file, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

print("✅ JSON file created successfully!")
