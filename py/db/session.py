import logging
import sqlalchemy

class Session:
  def __init__(self, db):
    self.db = db

  def get(self, sessionId):
    sql = """
      SELECT 
        sessionId, startTime, endTime, currentPos
      FROM 
        EventSession
      WHERE
        sessionId = {0};
    """.format(sessionId)
    logging.warning(msg=sql)
    with self.db.connect() as conn:
      rows = conn.execute(
              sqlalchemy.text(sql)
          ).fetchall()
    
    row = rows[0]
    result = {
        "sessionId": row[0], 
        "startTime": row[1], 
        "endTime": row[2], 
        "currentPos": row[3]}
    
    return result

  def list(self):
    sql = """
      SELECT 
        sessionId, startTime, endTime, currentPos
      FROM 
        EventSession
      ORDER BY
        startTime;
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
  
  def edit(self, sessionId, startTime, endTime, currentPos):
    sql = """
      UPDATE EventSession SET
        startTime = '{1}',
        endTime = '{2}',
        currentPos = {3}
      WHERE
        sessionId = {0};
    """.format(
      sessionId,
      startTime,
      endTime,
      currentPos
    )

    logging.warning(sql)

    with self.db.connect() as conn:
      conn.execute(sqlalchemy.text(sql))
      conn.commit()
    
    return []
