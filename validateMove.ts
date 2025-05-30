import {
  isPyramid,
  orientationToCoords,
  type Coords,
  type Orientation,
  type Board,
  type State,
  type Move,
} from "./types.ts";

/**
 * Can you get from `start` to `end` through `orientation` direction?
 */
const matchesDirection = (
  start: Coords,
  end: Coords,
  orientation: Orientation
): boolean => {
  const [startX, startY] = start;
  const [endX, endY] = end;

  const diffX = endX - startX;
  const diffY = endY - startY;

  if (diffX !== 0 && diffY !== 0 && diffX !== diffY) {
    // not a 1:1 diagonal
    return false;
  }
  const [dirX, dirY] = orientationToCoords[orientation];

  return dirX === Math.sign(diffX) && dirY === Math.sign(diffY);
};

const isObstructed = (
  board: Board,
  start: Coords,
  end: Coords,
  orientation: Orientation
): boolean => {
  const [startX, startY] = start;
  const [endX, endY] = end;
  const [dirX, dirY] = orientationToCoords[orientation];

  const path: Coords[] = [];
  let currentX = startX;
  let currentY = startY;

  while (!(currentX === endX && currentY === endY)) {
    currentX += dirX;
    currentY += dirY;
    path.push([currentX, currentY] as Coords);
  }
  path.pop();

  return path.some(([x, y]) => isPyramid(board[x][y]));
};

/**
 * Validate move
 */
export const validateMove = (state: State, move: Move): void => {
  const { start, end, orientation } = move;
  const [startX, startY] = start;
  const [endX, endY] = end;
  const { board, currentPlayer } = state;
  const startField = board[startX][startY];
  const endField = board[endX][endY];

  // Check if start field has a pyramid
  if (!isPyramid(startField)) {
    throw new Error(`There's no pyramid at (${startX},${startY})`);
  }

  if (startField.color !== currentPlayer) {
    throw new Error(
      `There's no ${currentPlayer}'s pyramid at (${startX},${startY})`
    );
  }

  if (startField.orientation === "UP" && (startX !== endX || startY !== endY)) {
    throw new Error(
      `${currentPlayer}'s pyramid at (${startX},${startY}) is pointing up - it can only reorient`
    );
  }

  if (
    startField.orientation === orientation &&
    startX === endX &&
    startY === endY
  ) {
    throw new Error(`Null moves are illegal`);
  }

  if (!matchesDirection(start, end, startField.orientation)) {
    throw new Error(
      `${currentPlayer}'s ${startField.size} (oriented ${startField.orientation}) cannot move from (${startX},${startY}) to (${endX},${endY})`
    );
  }

  if (isObstructed(board, start, end, startField.orientation)) {
    throw new Error(
      `The move from (${startX},${startY}) to (${endX},${endY}) is obstructed`
    );
  }

  // Check if end field has a pyramid and validate the attack
  if (isPyramid(endField)) {
    if (endField.color === startField.color) {
      throw new Error(`Cannot capture your own piece at (${endX},${endY})`);
    }
    if (!(startField.size > endField.size || endField.orientation !== "UP")) {
      throw new Error(
        `Attacking piece is not bigger than defending piece and the defending piece is oriented UP`
      );
    }
  }
};
