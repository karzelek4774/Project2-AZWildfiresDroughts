import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Resources/AZWildfires.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table

az_wildfires = Base.classes.az_wildfires
az_droughts = Base.classes.az_droughts

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################


#---------------------------------
# Web Pages
#---------------------------------
@app.route("/")
def home():

  return render_template("index.html")

@app.route("/data")
def data_page():

  return render_template("data.html")


#---------------------------------
# API
#---------------------------------
@app.route("/api/v1.0/az_wildfires")
def wildfires():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of wildfires"""
    # Query all wildfires
    results = session.query(az_wildfires.FIRE_NAME, az_wildfires.FIRE_YEAR, az_wildfires.DISCOVERY_TIME, az_wildfires.CONT_TIME, az_wildfires.STAT_CAUSE_CODE, az_wildfires.STAT_CAUSE_DESCR, az_wildfires.FIRE_SIZE, az_wildfires.FIRE_SIZE_CLASS, az_wildfires.LATITUDE, az_wildfires.LONGITUDE, az_wildfires.OWNER_CODE, az_wildfires.OWNER_DESCR, az_wildfires.STATE, az_wildfires.COUNTY, az_wildfires.fire_discovery_date, az_wildfires.fire_cont_date).all()
    session.close()

    # Create a dictionary from the row data and append to a list of all_wildfires
    all_fire = []
    for FIRE_NAME, FIRE_YEAR, DISCOVERY_TIME, CONT_TIME, STAT_CAUSE_CODE, STAT_CAUSE_DESCR, FIRE_SIZE, FIRE_SIZE_CLASS, LATITUDE, LONGITUDE, OWNER_CODE, OWNER_DESCR, STATE, COUNTY, fire_discovery_date, fire_cont_date in results:
        fire_dict = {}

        fire_dict["FIRE_NAME"] = FIRE_NAME
        fire_dict["FIRE_YEAR"] = FIRE_YEAR
        fire_dict["DISCOVERY_TIME"] = DISCOVERY_TIME
        fire_dict["CONT_TIME"] = CONT_TIME
        fire_dict["STAT_CAUSE_CODE"] = STAT_CAUSE_CODE
        fire_dict["STAT_CAUSE_DESCR"] = STAT_CAUSE_DESCR
        fire_dict["FIRE_SIZE"] = FIRE_SIZE
        fire_dict["FIRE_SIZE_CLASS"] = FIRE_SIZE_CLASS
        fire_dict["LATITUDE"] = LATITUDE
        fire_dict["LONGITUDE"] = LONGITUDE
        fire_dict["OWNER_CODE"] = OWNER_CODE
        fire_dict["OWNER_DESCR"] = OWNER_DESCR
        fire_dict["STATE"] = STATE
        fire_dict["COUNTY"] = COUNTY
        fire_dict["fire_discovery_date"] = fire_discovery_date
        fire_dict["fire_cont_date"] = fire_cont_date

        all_fire.append(fire_dict)

    return jsonify(all_fire)



@app.route("/api/v1.0/az_droughts")
def droughts():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of droughts"""
    # Query all droughts
    results = session.query(az_droughts.County, az_droughts.State, az_droughts.Year, az_droughts.Count, az_droughts.Condition).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_droughts
    all_droughts = []
    for County, State, Year, Count, Condition in results:
        drought_dict = {}

        drought_dict["County"] = County
        drought_dict["State"] = State
        drought_dict["Year"] = Year
        drought_dict["Count"] = Count
        drought_dict["Condition"] = Condition

        all_droughts.append(drought_dict)

    return jsonify(all_droughts)


if __name__ == '__main__':
    app.run(debug=True)
