from py.db.event_session import EventSession
from py.db.roster import Roster
from py.db.db_connector import CloudSqlConnector

import sqlalchemy

def init_connection_pool() -> sqlalchemy.engine.base.Engine:
  return CloudSqlConnector()

class DbHandler:
  def __init__(self):
    self.db = init_connection_pool()

  def handle_request(self, entity):
    match entity:
      case "es":
        rtn = EventSession(self.db).list()
      case "roster":
        rtn = Roster(self.db).list()
      case _:
        raise Exception("Request failed: Entity {0} does not exist.".format(entity))
    
    return rtn
    