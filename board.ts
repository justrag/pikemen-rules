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
 */
export function initBoard(): Board {
  return [
    // Row 0: 33321...
    [
      { color: 'blue', size: 3, orientation: 'UP' },
      { color: 'blue', size: 3, orientation: 'UP' },
      { color: 'blue', size: 3, orientation: 'UP' },
      { color: 'blue', size: 2, orientation: 'UP' },
      { color: 'blue', size: 1, orientation: 'UP' },
      {},
      {},
      {}
    ],
    // Row 1: 3221....
    [
      { color: 'blue', size: 3, orientation: 'UP' },
      { color: 'blue', size: 2, orientation: 'UP' },
      { color: 'blue', size: 2, orientation: 'UP' },
      { color: 'blue', size: 1, orientation: 'UP' },
      {},
      {},
      {},
      {}
    ],
    // Row 2: 321.....
    [
      { color: 'blue', size: 3, orientation: 'UP' },
      { color: 'blue', size: 2, orientation: 'UP' },
      { color: 'blue', size: 1, orientation: 'UP' },
      {},
      {},
      {},
      {},
      {}
    ],
    // Row 3: 21.....1
    [
      { color: 'blue', size: 2, orientation: 'UP' },
      { color: 'blue', size: 1, orientation: 'UP' },
      {},
      {},
      {},
      {},
      {},
      { color: 'red', size: 1, orientation: 'UP' }
    ],
    // Row 4: 1.....12
    [
      { color: 'blue', size: 1, orientation: 'UP' },
      {},
      {},
      {},
      {},
      {},
      { color: 'red', size: 1, orientation: 'UP' },
      { color: 'red', size: 2, orientation: 'UP' }
    ],
    // Row 5: .....123
    [
      {},
      {},
      {},
      {},
      {},
      { color: 'red', size: 1, orientation: 'UP' },
      { color: 'red', size: 2, orientation: 'UP' },
      { color: 'red', size: 3, orientation: 'UP' }
    ],
    // Row 6: ....1223
    [
      {},
      {},
      {},
      {},
      { color: 'red', size: 1, orientation: 'UP' },
      { color: 'red', size: 2, orientation: 'UP' },
      { color: 'red', size: 2, orientation: 'UP' },
      { color: 'red', size: 3, orientation: 'UP' }
    ],
    // Row 7: ...12333
    [
      {},
      {},
      {},
      { color: 'red', size: 1, orientation: 'UP' },
      { color: 'red', size: 2, orientation: 'UP' },
      { color: 'red', size: 3, orientation: 'UP' },
      { color: 'red', size: 3, orientation: 'UP' },
      { color: 'red', size: 3, orientation: 'UP' }
    ]
  ] as Board;
}

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
