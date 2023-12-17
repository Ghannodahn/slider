/* Select a row with a column as JSON. */
SELECT
  s.sessionId,
  json_to_array(
    SELECT * FROM performer p WHERE p.sessionId = s.sessionId
   )
FROM
  session s;

/* Insert with Return */
DO $$
DECLARE sessionId INT;
BEGIN
  CALL session_create('2023-11-24 7:00 PM', '2023-11-24 11:00 PM', 1, sessionId);
  SELECT sessionId;
END 
$$;

/* Delete Session and associated Performers */
DO $$
BEGIN
DELETE FROM Performer WHERE sessionId = 1;
DELETE FROM EventSession WHERE sessionId = 1;
END
$$;