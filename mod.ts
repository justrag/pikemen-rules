// Re-export all types
export type {
  Coord,
  Coords,
  Color,
  Size,
  Orientation,
  CaptureScore,
  Pyramid,
  EmptyField,
  Field,
  Row,
  Board,
  Move,
  State,
} from "./types.ts";

// Re-export all functions
export { isPyramid } from "./types.ts";
export { makeEmptyBoard, placePyramid } from "./board.ts";
export { makeMove } from "./makeMove.ts";
export { validateMove } from "./validateMove.ts";
export { possibleEndFields } from "./possibleEndFields.ts";

// Re-export constants
export { orientationToCoords } from "./types.ts";
