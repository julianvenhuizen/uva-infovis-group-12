from flask import render_template
import json
from . import main



@main.route('/', methods=['GET'])
def index():
	sunburst_data = json.load(open('app/data/sunburst_data.json'))
	barplot_data = json.load(open('app/data/barplot_data.json'))
	return render_template("home.html", data=[sunburst_data, barplot_data])


