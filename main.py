import datetime
import io
import json
import pprint
import sqlalchemy

from py.db import db_connector

from flask import Flask, render_template

app = Flask(__name__)

def init_connection_pool() -> sqlalchemy.engine.base.Engine:
  return db_connector.connect_with_connector()

@app.route("/data/test")
def data_test():
    # For the sake of example, use static information to inflate the template.
    # This will be replaced with real information in later steps.
    dummy_data = {
      "dates": [
        datetime.datetime(2018, 1, 1, 10, 0, 0).strftime("%Y-%m-%d"),
        datetime.datetime(2018, 1, 2, 10, 30, 0).strftime("%Y-%m-%d"),
        datetime.datetime(2018, 1, 3, 11, 0, 0).strftime("%Y-%m-%d"),
      ]}

    return dummy_data

@app.route("/data/connect")
def data_connect():
    db = init_connection_pool()

    with db.connect() as conn:
      rows = conn.execute(
              sqlalchemy.text(
                  "SELECT * FROM EventSession"
              )
          ).fetchall()
    
    result = {}

    for row in rows:
      result[row[0]] = {"sessionId": row[0], "startTime": row[1], "endTime": row[2]}

    # For the sake of example, use static information to inflate the template.
    # This will be replaced with real information in later steps.
    return result

if __name__ == "__main__":
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    # Flask's development server will automatically serve static files in
    # the "static" directory. See:
    # http://flask.pocoo.org/docs/1.0/quickstart/#static-files. Once deployed,
    # App Engine itself will serve those files as configured in app.yaml.
    app.run(host="127.0.0.1", port=8080, debug=True)
