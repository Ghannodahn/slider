import { Performer } from "../performers/performer";

export interface Session {
  sessionId: number;
  startTime: Date;
  endTime: Date;
  currentPos: number | null;
  performers: Performer[];
}

export var EmptySession = newSession();

export function newSession(): Session {
  return {
    sessionId: 0,
    startTime: new Date(),
    endTime: new Date(),
    currentPos: null,
    performers: []
  }
}
