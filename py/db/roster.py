import sqlalchemy

from py.db import db_connector

class Roster:
  def __init__(self, db):
    self.db = db

  def list(self, sessionId):
    with self.db.connect() as conn:
      rows = conn.execute(
              sqlalchemy.text(
                  "SELECT * FROM Roster WHERE sessionId = {0}".format(sessionId)
              )
          ).fetchall()
    
    result = []

    for row in rows:
      result.append({"rosterId": row[0], "sessionId": row[1], "displayName": row[2], "sessionPos": row[3]})

    # For the sake of example, use static information to inflate the template.
    # This will be replaced with real information in later steps.
    return result
  