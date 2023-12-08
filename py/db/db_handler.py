from py.db.session import Session
from py.db.performer import Performer
from py.db.db_connector import CloudSqlConnector

import logging
from flask.logging import default_handler

import sqlalchemy

def init_connection_pool() -> sqlalchemy.engine.base.Engine:
  return CloudSqlConnector()

class DbHandler:
  def __init__(self):
    self.log = logging.getLogger()
    self.log.addHandler(default_handler)
    
    self.db = init_connection_pool()

  def handle_request(self, entity, operation, args=None):
    handler = None

    if entity == "session":
      handler = Session(self.db)
    elif entity == "performer":
      handler = Performer(self.db)

      if operation == "reorder":
        return handler.reorder(**args)
      elif operation == "delete":
        return handler.delete(**args)
    else:
      raise Exception("Request failed: Entity {0} does not exist.".format(entity))

    if operation == "get":
      return handler.get(**args)
    if operation == "list":
      return handler.list(**args)
    elif operation == "create":
      return handler.create(**args)
    elif operation == "edit":
      return handler.edit(**args)
    else:
      raise Exception(
        "Request failed: Operation {0} is unsupported on entity {1}."
        .format(operation, entity))
