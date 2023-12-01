CREATE TABLE EventSession (
  sessionId SERIAL PRIMARY KEY,
  startTime TIMESTAMP,
  endTime   TIMESTAMP
  );

INSERT INTO EventSession (startTime, endTime) values ('2024-11-24 7:00 PM', '2024-11-24 11:00 PM');
INSERT INTO EventSession (startTime, content) values ('2024-11-26 7:00 PM', '2024-11-26 11:30 PM');