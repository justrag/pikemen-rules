import { assertEquals } from "@std/assert";
import type { Coords, CaptureScore } from "./types.ts";
import { makeEmptyBoard, placePyramid } from "./board.ts";
import { possibleEndFields } from "./possibleEndFields.ts";

Deno.test("move N direction", () => {
  const board = makeEmptyBoard();
  placePyramid(board, [4, 4], "red", 2, "N");

  const moves = possibleEndFields(board, [4, 4]);
  const expectedMoves: Array<[Coords, CaptureScore]> = [
    [[4, 4], 0], // reorientation
    [[4, 5], 0],
    [[4, 6], 0],
    [[4, 7], 0],
  ];
  assertEquals(moves, expectedMoves);
});

Deno.test("move NE direction", () => {
  const board = makeEmptyBoard();
  placePyramid(board, [4, 4], "red", 2, "NE");

  const moves = possibleEndFields(board, [4, 4]);
  const expectedMoves: Array<[Coords, CaptureScore]> = [
    [[4, 4], 0], // reorientation
    [[5, 5], 0],
    [[6, 6], 0],
    [[7, 7], 0],
  ];
  assertEquals(moves, expectedMoves);
});

Deno.test("move E direction", () => {
  const board = makeEmptyBoard();
  placePyramid(board, [4, 4], "red", 2, "E");

  const moves = possibleEndFields(board, [4, 4]);
  const expectedMoves: Array<[Coords, CaptureScore]> = [
    [[4, 4], 0], // reorientation
    [[5, 4], 0],
    [[6, 4], 0],
    [[7, 4], 0],
  ];
  assertEquals(moves, expectedMoves);
});

Deno.test("move SE direction", () => {
  const board = makeEmptyBoard();
  placePyramid(board, [4, 4], "red", 2, "SE");

  const moves = possibleEndFields(board, [4, 4]);
  const expectedMoves: Array<[Coords, CaptureScore]> = [
    [[4, 4], 0], // reorientation
    [[5, 3], 0],
    [[6, 2], 0],
    [[7, 1], 0],
  ];
  assertEquals(moves, expectedMoves);
});

Deno.test("UP pyramid can only reorient", () => {
  const board = makeEmptyBoard();
  placePyramid(board, [3, 3], "blue", 1, "UP");

  const moves = possibleEndFields(board, [3, 3]);
  assertEquals(moves, [[[3, 3], 0]]);
});

Deno.test("blocked by same color pyramid", () => {
  const board = makeEmptyBoard();
  placePyramid(board, [2, 2], "red", 2, "E");
  placePyramid(board, [4, 2], "red", 1, "N");

  const moves = possibleEndFields(board, [2, 2]);
  // Should only include empty spaces before the blocking pyramid
  const expectedMoves: Array<[Coords, CaptureScore]> = [
    [[2, 2], 0], // Reorientation
    [[3, 2], 0], // Empty space before blocking pyramid
  ];
  assertEquals(moves, expectedMoves);
});

Deno.test("can capture smaller enemy pyramid", () => {
  const board = makeEmptyBoard();
  placePyramid(board, [2, 2], "red", 2, "E");
  placePyramid(board, [4, 2], "blue", 1, "N");

  const moves = possibleEndFields(board, [2, 2]);
  // Should include empty spaces and capturable enemy pyramid
  const expectedMoves: Array<[Coords, CaptureScore]> = [
    [[2, 2], 0], // Reorientation
    [[3, 2], 0], // Empty space before enemy pyramid
    [[4, 2], 1], // Enemy pyramid (can capture, score 1)
  ];
  assertEquals(moves, expectedMoves);
});

Deno.test("cannot capture larger enemy pyramid", () => {
  const board = makeEmptyBoard();
  placePyramid(board, [2, 2], "red", 1, "E");
  placePyramid(board, [4, 2], "blue", 2, "N");

  const moves = possibleEndFields(board, [2, 2]);
  // Should only include empty spaces before the blocking pyramid
  const expectedMoves: Array<[Coords, CaptureScore]> = [
    [[2, 2], 0], // Reorientation
    [[3, 2], 0], // Empty space before enemy pyramid
  ];
  assertEquals(moves, expectedMoves);
});

Deno.test("can capture non-UP smaller pyramid", () => {
  const board = makeEmptyBoard();
  // Red pyramid facing east (size 3)
  placePyramid(board, [2, 2], "red", 3, "E");
  // Blue pyramid facing north (size 2)
  placePyramid(board, [4, 2], "blue", 2, "N");

  const moves = possibleEndFields(board, [2, 2]);
  // Should include empty spaces and capturable enemy pyramid
  const expectedMoves: Array<[Coords, CaptureScore]> = [
    [[2, 2], 0], // Reorientation
    [[3, 2], 0], // Empty space before enemy pyramid
    [[4, 2], 2], // Enemy pyramid (can capture, score 2)
  ];
  assertEquals(moves, expectedMoves);
});

Deno.test("can capture UP pyramid of same size", () => {
  const board = makeEmptyBoard();
  placePyramid(board, [2, 2], "red", 2, "E");
  placePyramid(board, [4, 2], "blue", 2, "UP");

  const moves = possibleEndFields(board, [2, 2]);
  // Should include empty spaces and capturable UP enemy pyramid
  const expectedMoves: Array<[Coords, CaptureScore]> = [
    [[2, 2], 0], // Reorientation
    [[3, 2], 0], // Empty space before enemy pyramid
    [[4, 2], 2], // Enemy UP pyramid (can capture, score 2)
  ];
  assertEquals(moves, expectedMoves);
});
