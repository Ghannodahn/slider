UPDATE performer SET
    sessionPos = positions.pos
FROM
    (SELECT 
        UNNEST(ARRAY[1, 2, 3, 4, 5]) AS id,
        UNNEST(ARRAY[5, 4, 3, 2, 1]) AS pos) AS positions
    WHERE positions.id = performer.performerId;