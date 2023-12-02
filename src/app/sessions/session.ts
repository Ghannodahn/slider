import { Time } from "@angular/common";

export interface Session {
  sessionId: number;
  startTime: Time | null;
  endTime: Time | null;
  selectedPos: number | null;
}
