import pandas as pd
import json

data = pd.read_csv("app/data/EUdataExpenditures.csv")

# Data structure per country
category_ids = ["1", "1.1", "1.1.1", "1.1.11", "1.1.12", "1.1.13", "1.1.2", "1.1.3",
"1.1.31", "1.1.32", "1.1.4", "1.1.5", "1.1.6", "1.1.7", "1.1.8", "1.1.81", "1.1.82",
"1.1.83", "1.1.9", "1.1.DAG", "1.1.OTH", "1.1.PPA", "1.1.SPEC", "1.2", "1.2.1", "1.2.11",
"1.2.12", "1.2.13", "1.2.14", "1.2.15", "1.2.2", "1.2.3", "1.2.31", "1.2.32", "1.2.4",
"1.2.5", "1.2.DAG", "1.2.OTH", "1.2.PPA", "1.2.SPEC", "2", "2.0.1", "2.0.10", "2.0.2", "2.0.3",
"2.0.31", "2.0.32", "2.0.4", "2.0.DAG", "2.0.OTH", "2.0.PPA", "2.0.SPEC", "3", "3.0.1",
"3.0.2", "3.0.3", "3.0.4", "3.0.5", "3.0.6", "3.0.7", "3.0.8", "3.0.9", "3.0.10", "3.0.11",
"3.0.DAG", "3.0.OTH", "3.0.PPA", "3.0.SPEC", "4", "4.0.1", "4.0.OTH", "5", "6", "8", "9"]

years = [2014, 2015, 2016, 2017, 2018, 2019]
countries = list(set(data.columns) - {'Year', 'ID', 'Entry', 'earmarked', 'other', 'non-EU', 'EU-28'})

def convertToDict(data):
    category_dict = dict()
    for id in category_ids:
        category = data.loc[data['ID'] == id, 'Entry'].values[0]
        category_data = []
        print(category)
        for year in years:
            year_data = {"Year": year}
            for country in countries:
                budget = data.loc[(data['ID'] == id) & (data['Year'] == year), [country]].values[0][0]
                if not isinstance(budget, float):
                    budget = float(budget.replace(',', ''))
                year_data.update({country: budget})
            category_data.append(year_data)
        category_dict[category] = category_data
    return category_dict

product = convertToDict(data)
print(product)
with open('app/data/barplot_data.json', 'w') as file:
    json.dump(product, file)