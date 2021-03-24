from flask import render_template
import json
from . import main



@main.route('/', methods=['GET'])
def index():
	filename = open('app/data/sunburst_data.json')
	EUdata = json.load(filename)
	return render_template("home.html", data = EUdata)





