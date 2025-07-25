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
  return [
    // Row 7: 33321...
    [
      { color: "blue", size: 3, orientation: "UP" },
      { color: "blue", size: 3, orientation: "UP" },
      { color: "blue", size: 3, orientation: "UP" },
      { color: "blue", size: 2, orientation: "UP" },
      { color: "blue", size: 1, orientation: "UP" },
      {},
      {},
      {},
    ],
    // Row 6: 3221....
    [
      { color: "blue", size: 3, orientation: "UP" },
      { color: "blue", size: 2, orientation: "UP" },
      { color: "blue", size: 2, orientation: "UP" },
      { color: "blue", size: 1, orientation: "UP" },
      {},
      {},
      {},
      {},
    ],
    // Row 5: 321.....
    [
      { color: "blue", size: 3, orientation: "UP" },
      { color: "blue", size: 2, orientation: "UP" },
      { color: "blue", size: 1, orientation: "UP" },
      {},
      {},
      {},
      {},
      {},
    ],
    // Row 4: 21.....1
    [
      { color: "blue", size: 2, orientation: "UP" },
      { color: "blue", size: 1, orientation: "UP" },
      {},
      {},
      {},
      {},
      {},
      { color: "red", size: 1, orientation: "UP" },
    ],
    // Row 3: 1.....12
    [
      { color: "blue", size: 1, orientation: "UP" },
      {},
      {},
      {},
      {},
      {},
      { color: "red", size: 1, orientation: "UP" },
      { color: "red", size: 2, orientation: "UP" },
    ],
    // Row 2: .....123
    [
      {},
      {},
      {},
      {},
      {},
      { color: "red", size: 1, orientation: "UP" },
      { color: "red", size: 2, orientation: "UP" },
      { color: "red", size: 3, orientation: "UP" },
    ],
    // Row 1: ....1223
    [
      {},
      {},
      {},
      {},
      { color: "red", size: 1, orientation: "UP" },
      { color: "red", size: 2, orientation: "UP" },
      { color: "red", size: 2, orientation: "UP" },
      { color: "red", size: 3, orientation: "UP" },
    ],
    // Row 0: ...12333
    [
      {},
      {},
      {},
      { color: "red", size: 1, orientation: "UP" },
      { color: "red", size: 2, orientation: "UP" },
      { color: "red", size: 3, orientation: "UP" },
      { color: "red", size: 3, orientation: "UP" },
      { color: "red", size: 3, orientation: "UP" },
    ],
  ].toReversed() as Board;
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
