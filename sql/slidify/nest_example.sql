SELECT
    s.sessionId, 
    to_json(ARRAY(SELECT 
        json_build_object(
            'id', p.performerId) 
        FROM Performer p 
        WHERE p.sessionId = s.sessionId 
    )) performers
FROM EventSession s;

SELECT
    s.sessionId, 
    s.startTime,
    s.endTime,
    s.currentPos,
    to_json(ARRAY(SELECT 
        json_build_object(
            'performerId', p.performerId, 
            'sessionId', p.sessionId,
            'displayName', p.displayName,
            'link', p.link,
            'socialIg', p.socialIg) 
        FROM Performer p 
        WHERE p.sessionId = s.sessionId 
    )) performers
FROM EventSession s;
