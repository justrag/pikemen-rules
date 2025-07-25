export type Coord = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type Coords = [column: Coord, row: Coord];
export type Color = "red" | "blue";
export type Size = 1 | 2 | 3;
export type Orientation =
  | "N"
  | "NE"
  | "E"
  | "SE"
  | "S"
  | "SW"
  | "W"
  | "NW"
  | "UP";
export type CaptureScore = Size | 0;

export interface Pyramid {
  color: Color;
  size: Size;
  orientation: Orientation;
}

// deno-lint-ignore no-empty-interface
export interface EmptyField {}

export type Field = Pyramid | EmptyField;

export const isPyramid = (field: Field): field is Pyramid =>
  "color" in field && "size" in field && "orientation" in field;

export type Row = [Field, Field, Field, Field, Field, Field, Field, Field];

/**
[0][0] is bottom-left
[0][7] is top-left
[7][0] is bottom-right
[7][7] is top-right

   Row 7: | ........ |
   Row 6: | ........ |
   Row 5: | ........ |
   Row 4: | ........ |
   Row 3: | ........ |
   Row 2: | ........ |
   Row 1: | ........ |
   Row 0: | ........ |
          ----------
   Cols:    01234567
*/
export type Board = [Row, Row, Row, Row, Row, Row, Row, Row];

export interface Move {
  start: Coords;
  end: Coords;
  orientation: Orientation;
}

export interface State {
  score: Record<Color, number>;
  turn: number;
  currentPlayer: Color;
  startingPlayer: Color;
  finished: boolean;
  board: Board;
}

export const orientationToCoords: Record<
  Orientation,
  [columnDelta: 0 | 1 | -1, rowDelta: 0 | 1 | -1]
> = {
  /**
  NW | N  | NE 
  W  | UP | E 
  SW | S  | SE 
  */
  N: [0, 1],
  NE: [1, 1],
  E: [1, 0],
  SE: [1, -1],
  S: [0, -1],
  SW: [-1, -1],
  W: [-1, 0],
  NW: [-1, 1],
  UP: [0, 0],
};
