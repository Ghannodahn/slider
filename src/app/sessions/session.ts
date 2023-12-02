import { Time } from "@angular/common";

export interface Session {
  sessionId: number;
  startTime: Date | null;
  endTime: Date | null;
  selectedPos: number | null;
}
