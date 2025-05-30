import { assertEquals } from "@std/assert";
import type { Board, Color, State } from "./types.ts";
import { makeEmptyBoard, placePyramid } from "./board.ts";
import { makeMove } from "./makeMove.ts";

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

////////////////
// makeMove
////////////////

Deno.test("basic move updates board and changes player", () => {
  const board = makeEmptyBoard();
  placePyramid(board, [4, 4], "red", 2, "N");
  const initialState = createInitialState(board);

  const newState = makeMove(initialState, {
    start: [4, 4],
    end: [4, 5],
    orientation: "N",
  });

  // Board updates
  assertEquals(newState.board[4][4], {});
  assertEquals(newState.board[4][5], {
    color: "red",
    size: 2,
    orientation: "N",
  });

  // Player changes
  assertEquals(newState.currentPlayer, "blue");

  // Turn and score remain the same
  assertEquals(newState.turn, 1);
  assertEquals(newState.score, { red: 0, blue: 0 });
  assertEquals(newState.finished, false);
});

Deno.test("capture adds to score and checks win condition", () => {
  const board = makeEmptyBoard();
  placePyramid(board, [4, 4], "red", 2, "N");
  placePyramid(board, [4, 5], "blue", 1, "S");
  const initialState = createInitialState(board, "red", "red", 1, {
    red: 10,
    blue: 0,
  });

  const newState = makeMove(initialState, {
    start: [4, 4],
    end: [4, 5],
    orientation: "N",
  });

  // Board updates
  assertEquals(newState.board[4][4], {});
  assertEquals(newState.board[4][5], {
    color: "red",
    size: 2,
    orientation: "N",
  });

  // Score updates and game finishes (10 + 1 = 11, not enough to win)
  assertEquals(newState.score, { red: 11, blue: 0 });
  assertEquals(newState.finished, false);

  // Place a blue pyramid that can be captured in the N direction
  placePyramid(newState.board, [4, 6], "blue", 1, "S");
  const winningState = makeMove(
    {
      ...newState,
      currentPlayer: "red",
      score: { ...newState.score, red: 11 },
      board: structuredClone(newState.board),
    },
    {
      start: [4, 5],
      end: [4, 6],
      orientation: "N",
    }
  );

  assertEquals(winningState.score, { red: 12, blue: 0 });
  assertEquals(winningState.finished, true);
});

Deno.test("turn increments after both players move", () => {
  const board = makeEmptyBoard();
  // Red's move
  placePyramid(board, [4, 4], "red", 2, "N");
  const initialState = createInitialState(board, "red", "red", 1);

  // Red moves first
  const afterRed = makeMove(initialState, {
    start: [4, 4],
    end: [4, 5],
    orientation: "N",
  });
  assertEquals(afterRed.turn, 1); // Turn doesn't increment after first player
  assertEquals(afterRed.currentPlayer, "blue");

  // Blue's move - place a blue pyramid that can move S
  placePyramid(afterRed.board, [5, 5], "blue", 2, "S");
  const afterBlue = makeMove(
    {
      ...afterRed,
      board: structuredClone(afterRed.board),
    },
    {
      start: [5, 5],
      end: [5, 4],
      orientation: "S",
    }
  );

  assertEquals(afterBlue.turn, 2); // Turn increments after second player
  assertEquals(afterBlue.currentPlayer, "red");
});

Deno.test("move updates orientation", () => {
  const board = makeEmptyBoard();
  placePyramid(board, [4, 4], "red", 2, "N");
  const initialState = createInitialState(board);

  const newState = makeMove(initialState, {
    start: [4, 4],
    end: [4, 5],
    orientation: "NE",
  });

  // Orientation should be updated to NE
  assertEquals(newState.board[4][5], {
    color: "red",
    size: 2,
    orientation: "NE",
  });
});

Deno.test("starting with blue player works correctly", () => {
  const board = makeEmptyBoard();
  placePyramid(board, [4, 4], "blue", 2, "S");
  const initialState = createInitialState(board, "blue", "blue", 1);

  const newState = makeMove(initialState, {
    start: [4, 4],
    end: [4, 3],
    orientation: "S",
  });

  assertEquals(newState.currentPlayer, "red");
  assertEquals(newState.turn, 1); // Turn doesn't increment after first player

  // Red's move
  placePyramid(newState.board, [5, 5], "red", 2, "N");
  const afterRed = makeMove(
    {
      ...newState,
      board: structuredClone(newState.board),
      currentPlayer: "red",
    },
    {
      start: [5, 5],
      end: [5, 6],
      orientation: "N",
    }
  );

  assertEquals(afterRed.currentPlayer, "blue");
  assertEquals(afterRed.turn, 2); // Turn increments after second player
});
