import type { Board, Coords, Color, Size, Orientation } from "./types.ts";

/**
 * Create a new empty 8x8 game board
 */
export const makeEmptyBoard = (): Board =>
  [
    [{}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}],
  ] as Board;

/**
 * Place a pyramid on the board at the specified coordinates
 */
export function placePyramid(
  board: Board,
  [x, y]: Coords,
  color: Color,
  size: Size,
  orientation: Orientation
): void {
  board[x][y] = { color, size, orientation };
}
