from py.db.event_session import EventSession
from py.db.performer import Performer
from py.db.db_connector import CloudSqlConnector

import logging
from flask.logging import default_handler

import sqlalchemy

def init_connection_pool() -> sqlalchemy.engine.base.Engine:
  return CloudSqlConnector()

class DbHandler:
  def __init__(self):
    root = logging.getLogger()
    root.addHandler(default_handler)
    
    self.db = init_connection_pool()

  def handle_request(self, entity, operation, args=None):
    if operation == "list":
      return self.handle_list_request(entity, args)
    elif operation == "create":
      return self.handle_create_request(entity, args)
    else:
      raise Exception("Request failed: Operation {0} is unsupported.".format(operation))

  def handle_list_request(self, entity, args=None):
    text = "Initializing DbHandler"
    logging.warning(text)
    
    if entity == "session":
      rtn = EventSession(self.db).list()
    elif entity == "performer":
      sessionId = args.get("sessionId")
      rtn = Performer(self.db).list(sessionId)
    else:
      raise Exception("Request failed: Entity {0} does not exist.".format(entity))
    
    return rtn
    
  def handle_create_request(self, entity, args):
    if entity == "session":
      startTime = args.get("startTime")
      endTime = args.get("endTime")

      EventSession(self.db).create(startTime, endTime)
    elif entity == "performer":
      sessionId = args.get("sessionId")
      displayName = args.get("displayName")
      sessionPos = args.get("sessionPos")

      Performer(self.db).create(sessionId, displayName, sessionPos)
    else:
      raise Exception("Request failed: Entity {0} does not exist.".format(entity))
