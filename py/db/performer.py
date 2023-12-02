import sqlalchemy

from py.db import db_connector

class Performer:
  def __init__(self, db):
    self.db = db

  def list(self, sessionId):
    sql = """
      SELECT
        performerId, sessionId, displayName, link, socialIg, sessionPos
      FROM
        performer
      WHERE
        sessionId = {0}
      ORDER BY
        sessionPos
    """.format(sessionId)

    with self.db.connect() as conn:
      rows = conn.execute(
              sqlalchemy.text(sql)
          ).fetchall()
    
    result = []

    for row in rows:
      result.append({
        "PerformerId": row[0], 
        "sessionId": row[1], 
        "displayName": row[2], 
        "link": row[3],
        "socialIg": row[4],
        "sessionPos": row[5]})

    # For the sake of example, use static information to inflate the template.
    # This will be replaced with real information in later steps.
    return result
  