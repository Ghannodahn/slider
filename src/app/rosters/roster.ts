import { Time } from "@angular/common";

export interface Roster {
  rosterId: number;
  sessionId: number;
  displayName: string;
  link: string;
  socialIg: string;
  sessionPos: number;
}

export var EmptyRoster: Roster = {
  rosterId: 0,
  sessionId: 0,
  displayName: "",
  link: "",
  socialIg: "",
  sessionPos: 0
}

  