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
    self.log = logging.getLogger()
    self.log.addHandler(default_handler)
    
    self.db = init_connection_pool()

  def handle_request(self, entity, operation, args=None):
    if operation == "list":
      return self.handle_list_request(entity, args)
    elif operation == "create":
      return self.handle_create_request(entity, args)
    elif operation == "edit":
      return self.handle_edit_request(entity, args)
    elif operation == "reorder":
      return self.handle_reorder_request(entity, args)
    elif operation == "delete":
      return self.handle_delete_request(entity, args)
    else:
      raise Exception("Request failed: Operation {0} is unsupported.".format(operation))

  def handle_list_request(self, entity, args=None):
    if entity == "session":
      rtn = EventSession(self.db).list()
    elif entity == "performer":
      sessionId = args["sessionId"]
      rtn = Performer(self.db).list(sessionId)
    else:
      raise Exception("Request failed: Entity {0} does not exist.".format(entity))
    
    return rtn
    
  def handle_create_request(self, entity, args):
    if entity == "session":
      startTime = args["startTime"]
      endTime = args["endTime"]

      EventSession(self.db).create(startTime, endTime)
    elif entity == "performer":
      sessionId = args["sessionId"]
      displayName = args["displayName"]
      sessionPos = args["sessionPos"]
      link = args["link"]
      socialIg = args["socialIg"]

      Performer(self.db).create(sessionId, displayName, sessionPos, link, socialIg)
    else:
      raise Exception("Request failed: Entity {0} does not exist.".format(entity))

    
  def handle_edit_request(self, entity, args):
    if entity == "session":
      raise Exception("Request failed: Updating Sessions is not currently supported.")
    elif entity == "performer":
      performerId = args["performerId"]
      displayName = args["displayName"]
      sessionPos = args["sessionPos"]
      link = args["link"]
      socialIg = args["socialIg"]

      Performer(self.db).edit(performerId, displayName, sessionPos, link, socialIg)
    else:
      raise Exception("Request failed: Entity {0} does not exist.".format(entity))
 
  def handle_reorder_request(self, entity, args):
    if entity == "session":
      raise Exception("Request failed: Reordering Sessions is not currently supported.")
    elif entity == "performer":
      newOrder = args

      Performer(self.db).reorder(newOrder)
    else:
      raise Exception("Request failed: Entity {0} does not exist.".format(entity))

  def handle_delete_request(self, entity, args):
    if entity == "session":
      raise Exception("Request failed: Deleting Sessions is not currently supported.")
    elif entity == "performer":
      performerId = args["performerId"]

      Performer(self.db).delete(performerId)
    else:
      raise Exception("Request failed: Entity {0} does not exist.".format(entity))
