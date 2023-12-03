import sqlalchemy

class Performer:
  def __init__(self, db):
    self.db = db

  def list(self, sessionId):
    sql = LIST_SQL.format(sessionId)

    with self.db.connect() as conn:
      rows = conn.execute(
              sqlalchemy.text(sql)
          ).fetchall()
    
    result = []

    for row in rows:
      result.append({
        "performerId": row[0], 
        "sessionId": row[1], 
        "displayName": row[2], 
        "link": row[3],
        "socialIg": row[4],
        "sessionPos": row[5]})

    return result

  def create(self, sessionId, displayName, sessionPos):
    sql = CREATE_SQL.format(sessionId, displayName, sessionPos)

    with self.db.connect() as conn:
      conn.execute(sqlalchemy.text(sql))
      conn.commit()
      
LIST_SQL = """
  SELECT
    performerId, sessionId, displayName, link, socialIg, sessionPos
  FROM
    performer
  WHERE
    sessionId = {0}
  ORDER BY
    sessionPos
  """

CREATE_SQL = """
  INSERT INTO 
    performer (sessionId, displayName, sessionPos) 
    VALUES ({0}, '{1}', {2})
  """
