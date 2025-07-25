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
 * Initialize a new board with the standard 2p starting position
 * Blue pieces in top-left, red pieces in bottom-right
 * Row 7: | 33321... |
 * Row 6: | 3221.... |
 * Row 5: | 321..... |
 * Row 4: | 21.....1 |
 * Row 3: | 1.....12 |
 * Row 2: | .....123 |
 * Row 1: | ....1223 |
 * Row 0: | ...12333 |
 *        ----------
 * Cols:    01234567
 */
export function initBoard(): Board {
  const a = makeEmptyBoard();

  const blues: Array<[Coords, Size]> = [
    // [col,row], size
    [[0, 7], 3],
    [[1, 7], 3],
    [[2, 7], 3],
    [[3, 7], 2],
    [[4, 7], 1],
    [[0, 6], 3],
    [[1, 6], 2],
    [[2, 6], 2],
    [[3, 6], 1],
    [[0, 5], 3],
    [[1, 5], 2],
    [[2, 5], 1],
    [[0, 4], 2],
    [[1, 4], 1],
    [[0, 3], 1],
  ];

  blues.forEach(([coords, size]) =>
    placePyramid(a, coords, "blue", size, "UP")
  );

  const reds: Array<[Coords, Size]> = [
    // [col,row], size
    [[7, 4], 1],
    [[6, 3], 1],
    [[7, 3], 2],
    [[5, 2], 1],
    [[6, 2], 2],
    [[7, 2], 3],
    [[4, 1], 1],
    [[5, 1], 2],
    [[6, 1], 2],
    [[7, 1], 3],
    [[3, 0], 1],
    [[4, 0], 2],
    [[5, 0], 3],
    [[6, 0], 3],
    [[7, 0], 3],
  ];

  reds.forEach(([coords, size]) => placePyramid(a, coords, "red", size, "UP"));

  return a;
}

/**
 * Place a pyramid on the board at the specified coordinates
 */
export function placePyramid(
  board: Board,
  [column, row]: Coords,
  color: Color,
  size: Size,
  orientation: Orientation
): void {
  board[column][row] = { color, size, orientation };
}
