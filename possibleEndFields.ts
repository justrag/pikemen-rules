import {
  isPyramid,
  orientationToCoords,
  type Board,
  type Coords,
  type CaptureScore,
  type Coord,
} from "./types.ts";

/**
 * Get all possible end fields for a given start field with their potential capture scores
 * @param board The current game board
 * @param start The starting coordinates [x, y] of the pyramid
 * @returns Array of [endCoords, captureScore] tuples
 */
export const possibleEndFields = (
  board: Board,
  start: Coords
): Array<[Coords, CaptureScore]> => {
  const [startX, startY] = start;
  const startField = board[startX][startY];
  const moves: Array<[Coords, CaptureScore]> = [];

  // If start field is not a pyramid, return empty array
  if (!isPyramid(startField)) {
    throw new Error("No pyramid at start position");
  }

  // Always include reorientation as the first move
  moves.push([start, 0]);

  // If pyramid is pointing up, it can only reorient
  if (startField.orientation === "UP") {
    return moves;
  }

  const startColor = startField.color;
  const [dirX, dirY] = orientationToCoords[startField.orientation];
  let currentX = startX + dirX;
  let currentY = startY + dirY;

  // Check all positions in the direction of the pyramid's orientation
  while (currentX >= 0 && currentX < 8 && currentY >= 0 && currentY < 8) {
    const endField = board[currentX][currentY];
    const currentPos: Coords = [currentX as Coord, currentY as Coord];

    // If we hit a pyramid, check if we can capture it
    if (isPyramid(endField)) {
      // Can capture if pyramid is smaller/equal, not pointing up, and not your own piece
      if (
        endField.color !== startColor &&
        (startField.size > endField.size || endField.orientation === "UP")
      ) {
        moves.push([currentPos, endField.size]);
      }
      // Stop in any case when we hit a pyramid (can't move past it)
      break;
    }

    // Empty field, can move here
    moves.push([currentPos, 0]);

    // Move to next position in direction
    currentX += dirX;
    currentY += dirY;
  }

  return moves;
};
