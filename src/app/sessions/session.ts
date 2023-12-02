import { Time } from "@angular/common";

export interface Session {
  sessionId: number;
  startTime: Date;
  endTime: Date;
  selectedPos: number | null;
}

export var EmptySession: Session = {
  sessionId: 0,
  startTime: new Date(),
  endTime: new Date(),
  selectedPos: null
}
