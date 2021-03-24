from flask import render_template, request, jsonify
import os, json

from decimal import Decimal

import pandas as pd
import numpy as np

from app import data
from . import main



@main.route('/', methods=['GET'])
def index():
	selected_country = request.args.get("selected_country")

	filename = open('app/data/sunburst_data.json')
	EUdata = json.load(filename)

	print(EUdata)
	return render_template("home.html", data = EUdata)





