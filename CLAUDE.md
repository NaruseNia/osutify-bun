# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

osutify! is a desktop music player for osu!/osu!lazer beatmaps. It reads directly from the osu!lazer Realm database and plays beatmap audio files.

## Architecture

This is an **Electrobun** application with a multi-process architecture:

### Process Structure
- **Backend (`src/bun/`)**: Bun runtime that manages the main window and database access
  - `src/bun/index.ts`: Entry point, creates BrowserWindow with RPC handlers
  - `src/bun/lib/db.ts`: Realm database connection manager for osu!lazer DB
  - `src/bun/lib/scheme.ts`: Realm schema definitions (Beatmap, BeatmapSet, File, etc.)

- **Frontend (`src/mainview/`)**: React renderer process with Vite HMR
  - `src/mainview/main.tsx`: React entry point
  - `src/mainview/App.tsx`: Root component
  - `src/mainview/store/useOsutifyStore.ts`: Zustand state store (playback controls)

- **Shared (`src/shared/`)**: TypeScript types shared between processes
  - `src/shared/types.ts`: RPC schema for Bun ↔ Webview communication

### Communication Pattern
Processes communicate via **Electrobun RPC**:
- RPC handlers defined in `src/bun/index.ts` using `BrowserView.defineRPC()`
- RPC types defined in `src/shared/types.ts` as `WebviewRPCType`
- Frontend calls backend via `BrowserView.rpc.requests.methodName()`

### Database Integration
The app reads osu!lazer's Realm database (`client.db`):
- Schema version: 51
- Key entities: Beatmap, BeatmapSet, BeatmapMetadata, BeatmapDifficulty, File
- Database path must be provided to `LazerDatabase` constructor

## Development Commands

### Running the App
```bash
# Standard development (builds frontend, starts Electrobun)
bun start

# Development with file watching
bun dev

# Development with Vite HMR (fastest iteration)
# Terminal 1: Start Vite dev server
bun hmr

# Terminal 2: Start Electrobun with auto-reload
bun dev
```

### Building
```bash
# Build for canary environment
bun run build:canary
```

### Code Quality
```bash
# Format code (runs automatically on commit)
bun fmt

# Check formatting
bun fmt:check

# Lint code (runs automatically on commit)
bun lint

# Fix lint issues
bun lint:fix
```

## Key Configuration

- **Vite**: Builds from `src/mainview/` → `dist/`, serves on port 5173
- **Electrobun**: Copies `dist/` → `views/mainview/` at build time
- **Lefthook**: Pre-commit hooks run `oxfmt` and `oxlint` on staged files
- **TypeScript**: Strict mode enabled, unused locals/parameters enforced

## Development Notes

- **HMR Workflow**: When using `bun run hmr`, Vite serves on `localhost:5173`. The Bun process detects this and uses the dev server URL instead of the built `views://` URL.
- **RPC Type Safety**: Always update `WebviewRPCType` in `src/shared/types.ts` when adding new RPC methods.
- **Database Schema**: The Realm schema mirrors osu!lazer's internal structure. If osu!lazer updates its DB schema version, update `schemaVersion` in `src/bun/lib/db.ts`.
- **Package Manager**: Uses bun, but `package.json` specifies `pnpm@10.32.1` as the package manager field.
