from py.db import db_handler
from flask import Flask, render_template, request, Response
import logging
import re

app = Flask(__name__, template_folder="static")

@app.route("/data/<entity>")
def data_connect(entity):
  args = request.args.to_dict()
  return db_handler.DbHandler().handle_request(entity, "list", args)

@app.route("/data/<entity>/<operation>", methods=["GET"])
def data_connect_op_get(entity, operation):
  args = request.args.to_dict()
  result = db_handler.DbHandler().handle_request(entity, operation, args)

  if result:
     return result
  else:
     return {"status": "Succeeded"}

@app.route("/data/<entity>/<operation>", methods=["PUT"])
def data_connect_op_put(entity, operation):
  args = request.get_json()["params"]
  result = db_handler.DbHandler().handle_request(entity, operation, args)

  if result:
     return result
  else:
     return {"status": "Succeeded"}

@app.route("/show")
def return_showapp():
  fullpath = "static/browser/index.html"

  file = open(fullpath, "r")
  result = file.read()
  return Response(result, mimetype="text/html")

@app.route("/show/<sessionid>")
def return_showapp_withsession(sessionid):
  fullpath = "static/browser/index.html"

  file = open(fullpath, "r")
  result = file.read()
  return Response(result, mimetype="text/html")
        
@app.route("/<filename>")
def return_file(filename):
  fullpath = "static/browser/{0}".format(filename)

  extension_re = re.search(".*\.(.*)", filename)
  if extension_re:
     extension = extension_re.group(1)

     if extension == "html":
        file = open(fullpath, "r")
        result = file.read()
        return Response(result, mimetype="text/html")
     elif extension == "js":
        file = open(fullpath, "r")
        result = file.read()
        return Response(result, mimetype="text/javascript")
     elif extension == "css":
        file = open(fullpath, "r")
        result = file.read()
        return Response(result, mimetype="text/css")
     elif extension == "ico":
        file = open(fullpath, "rb")
        result = file.read()
        return Response(result, mimetype="image/x-icon")
     else:
        raise Exception("Extension {0} not supported.".format(extension))
     
  return result

# Local Testing Only.
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
