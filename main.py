from py.db import db_handler
from flask import Flask, render_template

app = Flask(__name__, template_folder="static")

@app.route("/data/<entity>")
def data_connect(entity):
  #return entity
  return db_handler.DbHandler().handle_request(entity)

@app.route("/")
def show_index():
  return render_template("browser/index.html")

if __name__ == "__main__":
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    # Flask's development server will automatically serve static files in
    # the "static" directory. See:
    # http://flask.pocoo.org/docs/1.0/quickstart/#static-files. Once deployed,
    # App Engine itself will serve those files as configured in app.yaml.
    app.run(host="127.0.0.1", port=8080, debug=True)
