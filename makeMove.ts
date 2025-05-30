import { type State, type Move, isPyramid } from "./types.ts";
import { validateMove } from "./validateMove.ts";

/**
 * Make move
 */
export const makeMove = (state: State, move: Move): State => {
  validateMove(state, move);
  const { start, end, orientation } = move;
  const [startX, startY] = start;
  const [endX, endY] = end;

  const startField = state.board[startX][startY];
  const endField = state.board[endX][endY];
  const { currentPlayer, startingPlayer } = state;

  const newState = structuredClone(state);

  if (!isPyramid(startField)) {
    // This should never happen - validateMove should catch it
    throw new Error("No pyramid at start position");
  }

  if (isPyramid(endField)) {
    // Capture
    newState.score[currentPlayer] += endField.size;
    if (newState.score[currentPlayer] >= 12) {
      newState.finished = true;
    }
  }

  if (currentPlayer !== startingPlayer) {
    newState.turn += 1;
  }

  newState.currentPlayer = currentPlayer === "blue" ? "red" : "blue";

  newState.board[startX][startY] = {};
  newState.board[endX][endY] = {
    color: startField.color,
    size: startField.size,
    orientation,
  };

  return newState;
};
