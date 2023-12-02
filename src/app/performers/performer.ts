export interface Performer {
  PerformerId: number;
  sessionId: number;
  displayName: string;
  link: string;
  socialIg: string;
  sessionPos: number;
}

export var EmptyPerformer: Performer = {
  PerformerId: 0,
  sessionId: 0,
  displayName: "",
  link: "",
  socialIg: "",
  sessionPos: 0
}

  