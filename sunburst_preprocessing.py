import pandas as pd

data = pd.read_csv("app/data/EUdataExpenditures.csv")

# Data structure per country
structure = {"1":{"1.1":{"1.1.1":{"1.1.10":0,
                                  "1.1.11":0,
                                  "1.1.12":0,
                                  "1.1.13":0,
                                  "1.1.14":0,
                                  "1.1.15":0},
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
                         "1.2.6":0,
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
                 "3.0.12":0,
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

print(data)
print(data.columns)

# Takes data belonging to a country and stores it in a hierarchical dict
def countryDict(data, country):
    country_dict = {}

    # Depth 1
    for k1 in structure.keys():
        category1 = data.loc[data['ID'] == k1, 'Entry'][0]
        print("cat1: ", category1)
        print(country_dict)
        if structure[k1] != 0:
            country_dict[category1] = {}

            # Depth 2
            for k2 in structure[k1]:
                print("k2: ", k2)
                category2 = data.loc[data['ID'] == k2, 'Entry'][0]
                print("cat2: ", category2)
                print(country_dict)
                print(structure[k1][k2])
                if structure[k1][k2] != 0:
                    country_dict[category1][category2] = {}
                    print("goes here")

                    # Depth 3
                    for k3 in structure[k1][k2]:
                        category3 = data.loc[data['ID'] == k3, 'Entry'][0]
                        print("cat3: ", category3)
                        print(country_dict)
                        if structure[k1][k2][k3] != 0:
                            country_dict[category1][category2][category3] = {}

                            # Depth 4
                            for k4 in structure[k1][k2][k3]:
                                print(k4, structure[k1][k2][k3][k4])
                                category4 = data.loc[data['ID'] == k4, 'Entry'][0]
                                print("cat4: ", category4)
                                print(country_dict)
                                country_dict[category1][category2][category3][category4] = data.loc[data['ID'] == k4, country][0]
                        else:
                            print(k3, structure[k1][k2][k3])
                            country_dict[category1][category2][category3] = data.loc[data['ID'] == k3, country][0]
                else:
                    print(k2, structure[k1][k2])
                    country_dict[category1][category2] = data.loc[data['ID'] == k2, country][0]
        else:
            print(k1, structure[k1])
            country_dict[category1] = data.loc[data['ID'] == k1, country][0]
    return country_dict

countryDict(data[["ID", "Entry", " BE "]]," BE ")