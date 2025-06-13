# Pikemen Game Rules Engine

A TypeScript implementation of the game rules for Jacob Davenport's "Pikemen" (https://playagaingames.com/games/pikemen/), a strategic board game.
The library contains only the logic for the game rules, and does not include any UI.
Only the 2 player variant is supported.

## Project Structure

- `mod.ts` - Main entry point
- `types.ts` - Type definitions and interfaces
- `makeMove.ts` - Move execution logic
- `validateMove.ts` - Move validation logic
- `possibleEndFields.ts` - Move generation logic
- `board.ts` - Board initialization and manipulation
- `*_test.ts` - Test files

## Exported Functionalities

### Types

- **Coord**: Type representing a board coordinate (0-7)
- **Coords**: Type representing a board position as [x, y] coordinates
- **Color**: Type representing player colors ("red" | "blue")
- **Size**: Type representing pyramid sizes (1 | 2 | 3)
- **Orientation**: Type representing pyramid orientations ("N", "NE", "E", "SE", "S", "SW", "W", "NW", "UP")
- **CaptureScore**: Type representing capture score (Size | 0)
- **Pyramid**: Interface representing a pyramid piece with color, size, and orientation
- **EmptyField**: Interface representing an empty field
- **Field**: Type representing either a Pyramid or an EmptyField
- **Row**: Type representing a row on the board (8 fields)
- **Board**: Type representing the game board (8x8 grid)
- **Move**: Interface representing a move with start coordinates, end coordinates, and new orientation
- **State**: Interface representing the game state with score, turn, current player, starting player, finished status, and board

### Constants

- **orientationToCoords**: Record mapping orientation to coordinate changes [x, y]

### Functions

- **isPyramid(field: Field)**: Type guard function that checks if a field contains a pyramid
- **makeEmptyBoard()**: Creates a new empty 8x8 game board
- **initBoard()**: Initializes a new board with the standard 2-player starting position (blue in top-left, red in bottom-right)
- **placePyramid(board, coords, color, size, orientation)**: Places a pyramid on the board at the specified coordinates
- **makeMove(state, move)**: Executes a move on the game state and returns the new state, handling captures and turn management
- **validateMove(state, move)**: Validates if a move is legal according to the game rules, throwing errors for illegal moves
- **possibleEndFields(board, start)**: Returns all possible end fields for a given start position with their potential capture scores

### Running Tests

```bash
deno test --allow-read
```

## License

[MIT](LICENSE)
