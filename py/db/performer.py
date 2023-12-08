import logging
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

  def get(self, performerId):
    sql = GET_SQL.format(performerId)

    with self.db.connect() as conn:
      rows = conn.execute(
              sqlalchemy.text(sql)
          ).fetchall()
    
    row = rows[0]

    result = {
      "performerId": row[0], 
      "sessionId": row[1], 
      "displayName": row[2], 
      "link": row[3],
      "socialIg": row[4],
      "sessionPos": row[5]}

    return result

  def create(self, sessionId, displayName, sessionPos, link, socialIg):
    sql = CREATE_SQL.format(sessionId, displayName, sessionPos, link, socialIg)
    logging.warning("Executing SQL:")
    logging.warning(sql)

    with self.db.connect() as conn:
      conn.execute(sqlalchemy.text(sql))
      conn.commit()
  
  def edit(self, performerId, displayName, sessionPos, link, socialIg):
    sql = EDIT_SQL.format(performerId, displayName, sessionPos, link, socialIg)

    with self.db.connect() as conn:
      conn.execute(sqlalchemy.text(sql))
      conn.commit()
  
  def reorder(self, newOrder):
    ids = [performer['id'] for performer in newOrder]
    pos = [performer['pos'] for performer in newOrder]
    sql = ORDER_SQL.format(
      ", ".join(str(id) for id in ids),
      ", ".join(str(pos) for pos in pos))

    with self.db.connect() as conn:
      conn.execute(sqlalchemy.text(sql))
      conn.commit()

  def delete(self, performerId):
    sql = DELETE_SQL.format(performerId)

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
    performer (sessionId, displayName, sessionPos, link, socialIg) 
    VALUES ({0}, '{1}', {2}, '{3}', '{4}');
  """

EDIT_SQL = """
  UPDATE performer SET
    displayName = '{1}',
    sessionPos = {2},
    link = '{3}',
    socialIg = '{4}'
  WHERE
    performerId = {0};  
  """

ORDER_SQL = """
UPDATE performer SET
    sessionPos = positions.pos
FROM
    (SELECT 
        UNNEST(ARRAY[{0}]) AS id,
        UNNEST(ARRAY[{1}]) AS pos) AS positions
    WHERE positions.id = performer.performerId;
"""

DELETE_SQL = """
DELETE FROM performer 
WHERE performerId = {0};
"""

GET_SQL = """
SELECT
  performerId,
  sessionId,
  displayName,
  link,
  socialIG,
  sessionPos
FROM
  performer
WHERE
  performerId = {0};
"""