from flask import render_template, request, jsonify
import os, json

from decimal import Decimal

import pandas as pd
import numpy as np

from app import models, plots, data
from . import main


@main.route('/', methods=['GET'])
def index():
	return render_template("home.html")

@main.route('/austria', methods=['GET'])
def austria():
	return render_template("austria.html")

@main.route('/belgium', methods=['GET'])
def belgium():
	return render_template("belgium.html")

@main.route('/bulgaria', methods=['GET'])
def bulgaria():
	return render_template("bulgaria.html")

@main.route('/croatia', methods=['GET'])
def croatia():
	return render_template("croatia.html")

@main.route('/czech_republic', methods=['GET'])
def czech_republic():
	return render_template("czech_republic.html")

@main.route('/denmark', methods=['GET'])
def denmark():
	return render_template("denmark.html")

@main.route('/estonia', methods=['GET'])
def estonia():
	return render_template("estonia.html")

@main.route('/finland', methods=['GET'])
def finland():
	return render_template("finland.html")

@main.route('/france', methods=['GET'])
def france():
	return render_template("france.html")

@main.route('/germany', methods=['GET'])
def germany():
	return render_template("germany.html")

@main.route('/greece', methods=['GET'])
def greece():
	return render_template("greece.html")

@main.route('/hungary', methods=['GET'])
def hungary():
	return render_template("hungary.html")

@main.route('/ireland', methods=['GET'])
def ireland():
	return render_template("ireland.html")

@main.route('/italy', methods=['GET'])
def italy():
	return render_template("italy.html")

@main.route('/latvia', methods=['GET'])
def latvia():
	return render_template("latvia.html")

@main.route('/lithuania', methods=['GET'])
def lithuania():
	return render_template("lithuania.html")

@main.route('/luxembourg', methods=['GET'])
def luxembourg():
	return render_template("luxembourg.html")

@main.route('/netherlands', methods=['GET'])
def netherlands():
	return render_template("netherlands.html")

@main.route('/poland', methods=['GET'])
def poland():
	return render_template("poland.html")

@main.route('/portugal', methods=['GET'])
def portugal():
	return render_template("portugal.html")

@main.route('/romania', methods=['GET'])
def romania():
	return render_template("romania.html")

@main.route('/slovakia', methods=['GET'])
def slovakia():
	return render_template("slovakia.html")

@main.route('/slovenia', methods=['GET'])
def slovenia():
	return render_template("slovenia.html")

@main.route('/spain', methods=['GET'])
def spain():
	return render_template("spain.html")

@main.route('/sweden', methods=['GET'])
def sweden():
	return render_template("sweden.html")

@main.route('/united_kingdom', methods=['GET'])
def united_kingdom():
	return render_template("united_kingdom.html")

@main.route("/data", methods=['GET'])
def get_data():
	area = request.args.get("area")
	
	property_type = request.args.get("property")
	rental_price = request.args.get("price")
	surface_area = request.args.get("surface")
	plot = request.args.get("plot")

	query_input = []
	for idx, var in enumerate([surface_area, rental_price, property_type]):
		vars_query_input = [0] * len(data.all_var_types[idx])
		idx_query_var = data.all_var_types[idx].index(var)
		vars_query_input[idx_query_var] = 100
		query_input.extend(vars_query_input)

	#reshape query_input to correct format for input to our model
	query_input = np.array(query_input).reshape(1, -1)

	#retrain model based on new data
	trained_model = models.train_model(data.model_data, data.area_names, data.model_vars)

	#have our trained model make a prediction based on our query input
	_, probabilities = models.pred_proba(model=trained_model, input_vars=query_input)
	proba_idx = np.where(probabilities[0] == np.amax(probabilities[0]))
	proba_idx = proba_idx[0][0]
	
	#determine the index of the predicted area within the returned probabiblities array
	pred_area = data.area_names[proba_idx]
	proba = probabilities[0][proba_idx]
	proba = '%.3f' % Decimal(proba)

	#determine how the prediction probability of our previously predicted area has changed 
	#due to the change in data variables of this area
	if area is not None:
		proba_idx = data.area_names.index(area)
		new_proba_prev_area = probabilities[0][proba_idx]
		new_proba_prev_area = '%.3f' % Decimal(new_proba_prev_area)
		plot_area = area
	else:
		new_proba_prev_area = None
		plot_area = pred_area

	del probabilities
		
	if plot is not None:
		plot_data = data.model_data.loc[data.model_data['area_name'] == plot_area]
		plot_data = plot_data.loc[:, data.model_vars]
		plot = plots.create_hbar(plot_area, plot_data)
		return jsonify(prediction=pred_area, prediction_proba=proba, 
				area_changed_proba=new_proba_prev_area, plotData=plot)
	else:
		return jsonify(prediction=pred_area, prediction_proba=proba, 
				area_changed_proba=new_proba_prev_area)

	


@main.route('/d3', methods = ['GET'])
def d3():
	area_name = request.args.get("area_name")

	if area_name is None:
		area_name = "Centrum-West"

	plot_data = data.stats_ams.loc[data.stats_ams['area_name'] == area_name]
	plot_data = plot_data.drop(['area_name', 'area_code'], axis=1)
	plot_data = plot_data.to_json(orient='records')

	meta_data = data.stats_ams_meta.to_json(orient='records')
	return render_template("cyprus.html", meta_data=meta_data,
		x_variables=data.model_vars, area_names=data.area_names, selected_area_name=area_name)


@main.route('/d3_plot_data', methods = ['GET'])
def d3_plot_data():
	area_name = request.args.get("area_name")

	plot_data = data.stats_ams.loc[data.stats_ams['area_name'] == area_name]
	plot_data = plot_data.drop(['area_name', 'area_code'], axis=1)
	plot_data = plot_data.to_json(orient='records')

	return plot_data




