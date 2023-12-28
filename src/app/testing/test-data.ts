import { Performer } from "../performers/performer";
import { Session } from "../sessions/session"

export class TestData {
  public static NewPerformer: Performer = {performerId: 0, displayName: '', sessionId: 1, sessionPos: 3, link: '', socialIg: '', customStyle: null};
  
  public static Performers: Record<number, Performer> = {
    1: {performerId: 1, displayName: 'Steven Page', sessionId: 1, sessionPos: 0, link: '', socialIg: '', customStyle: null},
    2: {performerId: 2, displayName: 'Ed Robertson', sessionId: 1, sessionPos: 1, link: '', socialIg: '', customStyle: null},
    3: {performerId: 3, displayName: 'Tyler Stewart', sessionId: 1, sessionPos: 2, link: '', socialIg: '', customStyle: null},
    4: {performerId: 4, displayName: 'Jimmy Creegan', sessionId: 2, sessionPos: 0, link: '', socialIg: '', customStyle: null},
    5: {performerId: 5, displayName: 'Andrew Creegan', sessionId: 2, sessionPos: 1, link: '', socialIg: '', customStyle: null},
  }

  public static NewSession: Session = {sessionId: 0, startTime: new Date("2023-12-10 19:00:00"), endTime: new Date("2023-12-10 23:00:00"), currentPos: null};

  public static Sessions: Record<number, Session> = {
    1: {sessionId: 1, startTime: new Date("2023-12-01 19:00:00"), endTime: new Date("2023-12-01 23:00:00"), currentPos: null, 
        performers: [this.Performers[1], this.Performers[2], this.Performers[3]]},
    2: {sessionId: 2, startTime: new Date("2023-12-06 19:00:00"), endTime: new Date("2023-12-01 23:30:00"), currentPos: null, 
        performers: [this.Performers[4], this.Performers[5]]},
  }  
}
