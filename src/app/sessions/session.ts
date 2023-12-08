import { Time } from "@angular/common";

export interface Session {
  sessionId: number;
  startTime: Date;
  endTime: Date;
  currentPos: number | null;
}

export var EmptySession: Session = {
  sessionId: 0,
  startTime: new Date(),
  endTime: new Date(),
  currentPos: null
}
