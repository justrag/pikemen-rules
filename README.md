# Pikemen Game Rules Engine

A TypeScript implementation of the game rules for Jacob Davenport's "Pikemen" (https://playagaingames.com/games/pikemen/), a strategic board game.
The library contains only the logic for the game rules, and does not include any UI.
Only the 2 player variant is supported.

## Features

- Game state management
- Move validation
- Capture mechanics
- Win condition checking
- Turn management

## Getting Started

### Prerequisites

- [Deno](https://deno.land/) (tested with version 1.35.0+)

### Running Tests

```bash
deno test --allow-read
```

## Project Structure

- `mod.ts` - Main entry point
- `types.ts` - Type definitions and interfaces
- `makeMove.ts` - Move execution logic
- `validateMove.ts` - Move validation logic
- `possibleEndFields.ts` - Move generation logic
- `makeEmptyBoard.ts` - Board initialization
- `*_test.ts` - Test files

## License

[MIT](LICENSE)
