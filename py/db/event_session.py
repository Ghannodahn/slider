import sqlalchemy

from py.db import db_connector

class EventSession:
  def __init__(self, db):
    self.db = db

  def list(self):
    with self.db.connect() as conn:
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
  