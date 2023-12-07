export interface Performer {
  performerId: number;
  sessionId: number;
  displayName: string;
  link: string;
  socialIg: string;
  sessionPos: number;
}

export var EmptyPerformer: Performer = newPerformer();

export function newPerformer() {
  return {
    performerId: 0,
    sessionId: 0,
    displayName: "EMPTY",
    link: "",
    socialIg: "",
    sessionPos: 0
  }
}
