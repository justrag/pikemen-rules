import { assertThrows } from "@std/assert";
import type { Board, Color, State } from "./types.ts";
import { makeEmptyBoard, placePyramid } from "./board.ts";
import { validateMove } from "./validateMove.ts";

function createInitialState(
  board: Board,
  currentPlayer: Color = "red",
  startingPlayer: Color = "red",
  turn: number = 1,
  score: { red: number; blue: number } = { red: 0, blue: 0 },
  finished: boolean = false
): State {
  return {
    board,
    currentPlayer,
    startingPlayer,
    turn,
    score,
    finished,
  };
}

Deno.test("valid move in N direction", () => {
  const board = makeEmptyBoard();
  placePyramid(board, [4, 4], "red", 2, "N");
  const state = createInitialState(board);

  // Should not throw for valid move
  validateMove(state, {
    start: [4, 4],
    end: [4, 6],
    orientation: "N",
  });
});

Deno.test("valid reorientation in place", () => {
  const board = makeEmptyBoard();
  placePyramid(board, [4, 4], "red", 2, "UP");
  const state = createInitialState(board);

  // Should not throw for valid move
  validateMove(state, {
    start: [4, 4],
    end: [4, 4],
    orientation: "N",
  });
});

Deno.test("valid capture move", () => {
  const board = makeEmptyBoard();
  placePyramid(board, [4, 4], "red", 2, "N");
  placePyramid(board, [4, 6], "blue", 1, "S");
  const state = createInitialState(board);

  // Should not throw for valid capture
  validateMove(state, {
    start: [4, 4],
    end: [4, 6],
    orientation: "N",
  });
});

Deno.test("throws when no pyramid at start", () => {
  const board = makeEmptyBoard();
  const state = createInitialState(board);

  assertThrows(
    () =>
      validateMove(state, {
        start: [4, 4],
        end: [4, 5],
        orientation: "N",
      }),
    Error,
    "There's no pyramid at (4,4)"
  );
});

Deno.test("throws when moving opponent's piece", () => {
  const board = makeEmptyBoard();
  placePyramid(board, [4, 4], "blue", 2, "N");
  const state = createInitialState(board, "red");

  assertThrows(
    () =>
      validateMove(state, {
        start: [4, 4],
        end: [4, 5],
        orientation: "N",
      }),
    Error,
    "There's no red's pyramid at (4,4)"
  );
});

Deno.test("throws when moving UP pyramid to different position", () => {
  const board = makeEmptyBoard();
  placePyramid(board, [4, 4], "red", 2, "UP");
  const state = createInitialState(board);

  assertThrows(
    () =>
      validateMove(state, {
        start: [4, 4],
        end: [4, 5],
        orientation: "N",
      }),
    Error,
    "red's pyramid at (4,4) is pointing up - it can only reorient"
  );
});

Deno.test("throws for null move (same start/end and same orientation)", () => {
  const board = makeEmptyBoard();
  placePyramid(board, [4, 4], "red", 2, "N");
  const state = createInitialState(board);

  assertThrows(
    () =>
      validateMove(state, {
        start: [4, 4],
        end: [4, 4],
        orientation: "N",
      }),
    Error,
    "Null moves are illegal"
  );
});

Deno.test("throws for move in wrong direction", () => {
  const board = makeEmptyBoard();
  placePyramid(board, [4, 4], "red", 2, "N");
  const state = createInitialState(board);

  assertThrows(
    () =>
      validateMove(state, {
        start: [4, 4],
        end: [5, 5],
        orientation: "N",
      }),
    Error,
    "red's 2 (oriented N) cannot move from (4,4) to (5,5)"
  );
});

Deno.test("throws for move through obstruction", () => {
  const board = makeEmptyBoard();
  placePyramid(board, [4, 4], "red", 2, "N");
  placePyramid(board, [4, 5], "red", 1, "N");
  const state = createInitialState(board);

  assertThrows(
    () =>
      validateMove(state, {
        start: [4, 4],
        end: [4, 6],
        orientation: "N",
      }),
    Error,
    "The move from (4,4) to (4,6) is obstructed"
  );
});

Deno.test("throws for invalid capture (same color)", () => {
  const board = makeEmptyBoard();
  placePyramid(board, [4, 4], "red", 2, "N");
  placePyramid(board, [4, 6], "red", 1, "S");
  const state = createInitialState(board);

  assertThrows(
    () =>
      validateMove(state, {
        start: [4, 4],
        end: [4, 6],
        orientation: "N",
      }),
    Error,
    "Cannot capture your own piece at (4,6)"
  );
});

Deno.test("throws for invalid capture (larger pyramid)", () => {
  const board = makeEmptyBoard();
  placePyramid(board, [4, 4], "red", 2, "N");
  placePyramid(board, [4, 6], "blue", 3, "UP"); // Larger and UP
  const state = createInitialState(board);

  assertThrows(
    () =>
      validateMove(state, {
        start: [4, 4],
        end: [4, 6],
        orientation: "N",
      }),
    Error,
    "Attacking piece is not bigger than defending piece and the defending piece is oriented UP"
  );
});
