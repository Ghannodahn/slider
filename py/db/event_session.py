import sqlalchemy

from py.db import db_connector

class EventSession:
  def __init__(self, db):
    self.db = db

  def list(self):
    sql = """
      SELECT 
        sessionId, startTime, endTime, currentPos
      FROM 
        EventSession
    """
    with self.db.connect() as conn:
      rows = conn.execute(
              sqlalchemy.text(sql)
          ).fetchall()
    
    result = []

    for row in rows:
      result.append({
        "sessionId": row[0], 
        "startTime": row[1], 
        "endTime": row[2], 
        "currentPos": row[3]})

    # For the sake of example, use static information to inflate the template.
    # This will be replaced with real information in later steps.
    return result
  