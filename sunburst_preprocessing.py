import pandas as pd
import json

data = pd.read_csv("app/data/EUdataExpenditures.csv")
# data = data[data.Year == 2014]

# Data structure per country
structure = {"1":{"1.1":{"1.1.1":{"1.1.11":0,
                                  "1.1.12":0,
                                  "1.1.13":0},
                         "1.1.2":0,
                         "1.1.3":{"1.1.31":0,
                                  "1.1.32":0},
                         "1.1.4":0,
                         "1.1.5":0,
                         "1.1.6":0,
                         "1.1.7":0,
                         "1.1.8":{"1.1.81":0,
                                  "1.1.82":0,
                                  "1.1.83":0},
                         "1.1.9":0,
                         "1.1.DAG":0,
                         "1.1.OTH":0,
                         "1.1.PPA":0,
                         "1.1.SPEC":0},
                  "1.2": {"1.2.1":{"1.2.11":0,
                                   "1.2.12":0,
                                   "1.2.13":0,
                                   "1.2.14":0,
                                   "1.2.15":0},
                         "1.2.2":0,
                         "1.2.3":{"1.2.31":0,
                                  "1.2.32":0},
                         "1.2.4":0,
                         "1.2.5":0,
                         "1.2.DAG":0,
                         "1.2.OTH":0,
                         "1.2.PPA":0,
                         "1.2.SPEC":0}},
             "2":{"2.0.1":{"2.0.10":0},
                 "2.0.2":0,
                 "2.0.3":{"2.0.31":0,
                          "2.0.32":0},
                 "2.0.4":0,
                 "2.0.DAG":0,
                 "2.0.OTH":0,
                 "2.0.PPA":0,
                 "2.0.SPEC":0},
             "3":{"3.0.1":0,
                 "3.0.2":0,
                 "3.0.3":0,
                 "3.0.4":0,
                 "3.0.5":0,
                 "3.0.6":0,
                 "3.0.7":0,
                 "3.0.8":0,
                 "3.0.9":0,
                 "3.0.10":0,
                 "3.0.11":0,
                 "3.0.DAG":0,
                 "3.0.OTH":0,
                 "3.0.PPA":0,
                 "3.0.SPEC":0},
             "4":{"4.0.1":0,
                 "4.0.OTH":0},
             "5":0,
             "6":0,
             "8":0,
             "9":0}

country_names = {
        "AL": "Albania",
        "AT": "Austria",
        "BE": "Belgium",
        "BG": "Bulgaria",
        "BA": "Bosnia and Herz.",
        "BY": "Belarus",
        "CH": "Switzerland",
        "CZ": "Czech Rep.",
        "DE": "Germany",
        "DK": "Denmark",
        "EE": "Estonia",
        "FI": "Finland",
        "UK": "United Kingdom",
        "EL": "Greece",
        "HR": "Croatia",
        "HU": "Hungary",
        "IE": "Ireland",
        "IS": "Iceland",
        "IT": "Italy",
        "LT": "Lithuania",
        "LU": "Luxembourg",
        "LV": "Latvia",
        "MD": "Moldova",
        "MK": "Macedonia",
        "ME": "Montenegro",
        "NL": "Netherlands",
        "NO": "Norway",
        "PL": "Poland",
        "PT": "Portugal",
        "RO": "Romania",
        "RS": "Serbia",
        "SK": "Slovakia",
        "SI": "Slovenia",
        "SE": "Sweden",
        "UA": "Ukraine",
        "FR": "France",
        "ES": "Spain",
        "CY": "Cyprus",
        "MT": "Malta",
        "Total": "Total"
    }

# Takes data belonging to a country and stores it in a hierarchical dict
def countryDict(data, country):
    country_children = []

    # Depth 1
    for k1 in structure.keys():
        category1 = data.loc[data['ID'] == k1, 'Entry'].item()
        children_list1 = []
        if structure[k1] != 0:

            # Depth 2
            for k2 in structure[k1]:
                category2 = data.loc[data['ID'] == k2, 'Entry'].item()
                children_list2 = []
                if structure[k1][k2] != 0:

                    # Depth 3
                    for k3 in structure[k1][k2]:
                        category3 = data.loc[data['ID'] == k3, 'Entry'].item()
                        children_list3 = []
                        if structure[k1][k2][k3] != 0:

                            # Depth 4
                            for k4 in structure[k1][k2][k3]:
                                category4 = data.loc[data['ID'] == k4, 'Entry'].item()
                                size4 = data.loc[data['ID'] == k4, country].item()
                                if not isinstance(size4, float):
                                    size4 = float(size4.replace(',', ''))
                                children_list3.append({"name": category4, "size": size4})

                        # Depth 3
                            children_list2.append({"name": category3, "children": children_list3})
                        else:
                            size3 = data.loc[data['ID'] == k3, country].item()
                            if not isinstance(size3, float):
                                size3 = float(size3.replace(',', ''))
                            children_list2.append({"name": category3, "size": size3})

                # Depth 2
                    children_list1.append({"name": category2, "children": children_list2})
                else:
                    size2 = data.loc[data['ID'] == k2, country].item()
                    if not isinstance(size2, float):
                        size2 = float(size2.replace(',', ''))
                    children_list1.append({"name": category2, "size": size2})

        # Depth 1
            country_children.append({"name": category1, "children": children_list1})
        else:
            size1 = data.loc[data['ID'] == k1, country].item()
            if not isinstance(size1, float):
                size1 = float(size1.replace(',', ''))
            country_children.append({"name": category1, "size": size1})
    return {"name":country_names[country], "children":country_children}


# print(countryDict(data[["Year", "ID", "Entry", "BE"]],"BE"))

def convertToDict(data):
    countries = list(set(data.columns) - set(['Year', 'ID', 'Entry', 'earmarked', 'other', 'non-EU', 'EU-28']))
    years = [2014, 2015, 2016, 2017, 2018, 2019]
    data_dict = dict()
    for year in years:
        print(year)
        data_dict[year] = dict()
        year_data = data[data.Year == year]
        for country in countries:
            data_dict[year][country] = countryDict(year_data[["ID", "Entry", country]], country)
    return data_dict

product = convertToDict(data)
print(product)
with open('app/data/sunburst_data.json', 'w') as file:
    json.dump(product, file)