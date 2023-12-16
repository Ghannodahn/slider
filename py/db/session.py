import logging
import sqlalchemy

class Session:
  def __init__(self, db):
    self.db = db

  def get(self, sessionId):
    sql = """
      SELECT
          s.sessionId, 
          s.startTime,
          s.endTime,
          s.currentPos,
          to_json(ARRAY(SELECT 
              json_build_object(
                  'performerId', p.performerId, 
                  'sessionId', p.sessionId,
                  'sessionPos', p.sessionPos,
                  'displayName', p.displayName,
                  'link', p.link,
                  'socialIg', p.socialIg) 
              FROM Performer p 
              WHERE p.sessionId = s.sessionId 
              ORDER BY p.sessionPos
          )) performers
      FROM EventSession s
      WHERE
        s.sessionId = {0};
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
        "currentPos": row[3],
        "performers": row[4]}
    
    return result

  def list(self):
    sql = """
      SELECT 
        s.sessionId,
        s.startTime, 
        s.endTime,
        s.currentPos,
        to_json(ARRAY(SELECT 
            json_build_object(
                'performerId', p.performerId, 
                'sessionId', p.sessionId,
                'sessionPos', p.sessionPos,
                'displayName', p.displayName,
                'link', p.link,
                'socialIg', p.socialIg) 
            FROM Performer p 
            WHERE p.sessionId = s.sessionId 
            ORDER BY p.sessionPos
        )) performers
      FROM 
        EventSession s
      ORDER BY
        s.startTime DESC;
    """
    logging.warning(sql)
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
        "currentPos": row[3],
        "performers": row[4]})

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
