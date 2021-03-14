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

	EUdata = data.stats_eu.to_json(orient='records')
	return render_template("home.html", data = EUdata)





