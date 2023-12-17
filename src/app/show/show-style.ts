export interface ShowStyle {
  backgroundColor: string;
  textColor: string;
  fontName: string;
  fontSize: number;
}

export var EmptyShowStyle = newShowStyle();

export function newShowStyle(): ShowStyle {
  return {
    backgroundColor: '#6495ED',
    textColor: '#ffffff',
    fontName: 'Verdana',
    fontSize: 6
  }
}