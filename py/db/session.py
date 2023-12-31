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
                  'socialIg', p.socialIg,
                  'customStyle', p.customStyle) 
              FROM Performer p 
              WHERE p.sessionId = s.sessionId 
              ORDER BY p.sessionPos
          )) performers
      FROM EventSession s
      WHERE
        s.sessionId = {0};
    """.format(sessionId)

    logging.info('Session > Get > {0}'.format(sessionId))

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
                'socialIg', p.socialIg,
                'customStyle', p.customStyle) 
            FROM Performer p 
            WHERE p.sessionId = s.sessionId 
            ORDER BY p.sessionPos
        )) performers
      FROM 
        EventSession s
      ORDER BY
        s.startTime DESC;
    """
    logging.info('Session > List')

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
    if (currentPos == None):
      currentPos = "NULL"

    sql = """
      UPDATE EventSession SET
        startTime = '{1}',
        endTime = '{2}',
        currentPos = {3}
      WHERE
        sessionId = {0};
    """.format(
      sessionId,
      startTime.format("%Y-%m-%d %H:%M:%S"),
      endTime.format("%Y-%m-%d %H:%M:%S"),
      currentPos
    )

    logging.info('Sessions > Edit')

    with self.db.connect() as conn:
      conn.execute(sqlalchemy.text(sql))
      conn.commit()
    
    return []

  def create(self, startTime, endTime, currentPos, **args):
    if (currentPos == None):
      currentPos = "NULL"
      
    sql = """
      INSERT INTO EventSession (
        startTime, endTime, currentPos) 
      VALUES ('{0}', '{1}', {2})
      RETURNING sessionId;
      """.format(
        startTime.format("%Y-%m-%d %H:%M:%S"),
        endTime.format("%Y-%m-%d %H:%M:%S"),
        currentPos
      )

    logging.info('Sessions > Create')

    with self.db.connect() as conn:
      rows = conn.execute(
        sqlalchemy.text(sql)
      ).fetchall()
      conn.commit()

      id = rows[0][0]
      logging.info('Sessions > Created : {0}'.format(id))
      return {'id': id}
  
  def delete(self, sessionId, **args):
    sql = """
      DO $$
      BEGIN
        DELETE FROM Performer WHERE sessionId = {0};
        DELETE FROM EventSession WHERE sessionId = {0};
      END
      $$;
    """.format(sessionId)

    with self.db.connect() as conn:
      conn.execute(sqlalchemy.text(sql))
      conn.commit()
