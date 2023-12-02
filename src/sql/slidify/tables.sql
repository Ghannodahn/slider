DROP TABLE IF EXISTS EventSession;
CREATE TABLE EventSession (
  sessionId  SERIAL PRIMARY KEY,
  startTime  TIMESTAMP,
  endTime    TIMESTAMP,
  currentPos INTEGER
  );

INSERT INTO EventSession (startTime, endTime, currentPos) 
                  VALUES ('2023-11-24 7:00 PM', '2023-11-24 11:00 PM', 1);
INSERT INTO EventSession (startTime, endTime, currentPos) 
                  VALUES ('2023-11-26 7:00 PM', '2023-11-26 11:30 PM', 1);

DROP TABLE IF EXISTS Roster;
CREATE TABLE Roster (
  rosterId    SERIAL PRIMARY KEY,
  sessionId   SERIAL,
  displayName VARCHAR(50),
  socialIg    VARCHAR(50),
  link        VARCHAR(50),
  sessionPos  INTEGER,
  isActive    BOOLEAN DEFAULT FALSE,
  isComplete  BOOLEAN DEFAULT FALSE
);

INSERT INTO 
  Roster (sessionId, displayName, sessionPos) 
  VALUES (1, 'David McReynolds', 1);
INSERT INTO 
  Roster (sessionId, displayName, sessionPos) 
  VALUES (1, 'No Repeat Miro', 3);
INSERT INTO 
  Roster (sessionId, displayName, sessionPos) 
  VALUES (1, 'Greener Mind', 2);
INSERT INTO 
  Roster (sessionId, displayName, socialIg, link, sessionPos) 
  VALUES (1, 'Joe Allan Muharsky', 'bassicNerd', 'bassicnerd.com', 5);
INSERT INTO 
  Roster (sessionId, displayName, sessionPos) 
  VALUES (1, 'Heather Wonders', 4);
