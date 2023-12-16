/* Select a row with a column as JSON. */
SELECT
  s.sessionId,
  json_to_array(
    SELECT * FROM performer p WHERE p.sessionId = s.sessionId
   )
FROM
  session s;
