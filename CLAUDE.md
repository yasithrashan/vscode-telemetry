# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a VSCode extension that implements telemetry tracking with dual output: events are sent to Application Insights via `@vscode/extension-telemetry` and simultaneously logged to a local JSON file for debugging and analysis.

## Build and Development Commands

```bash
# Compile TypeScript
npm run compile

# Watch mode for development
npm run watch

# Lint code
npm run lint

# Run tests
npm run test

# Prepare for publishing
npm run vscode:prepublish
```

## Architecture

### Telemetry System

The extension uses a dual-logging approach implemented in [src/extension.ts](src/extension.ts):

1. **Remote Telemetry**: Uses `TelemetryReporter` from `@vscode/extension-telemetry` to send events to Application Insights
2. **Local Logging**: Simultaneously writes telemetry events to a JSON file stored in `.telemetry/telemetry.json`

The `sendTelemetryWithLog()` helper function handles both operations atomically. All telemetry events include:
- `timestamp` (ISO 8601 format)
- `eventName`
- `properties` (key-value pairs)
- `measurements` (numeric values)

### Storage Location

Telemetry JSON file is stored in the `.telemetry/` folder at the extension's root directory, which:
- Makes telemetry data easily accessible during development
- Is excluded from git via `.gitignore`
- Provides a convenient location for debugging and local analysis

### Commands

- `vscode-telemetry.helloWorld` - Demo command that sends telemetry
- `vscode-telemetry.viewTelemetry` - Opens the local telemetry JSON file in editor

## TypeScript Configuration

- **Module**: Node16
- **Target**: ES2022
- **Strict mode**: Enabled
- **Output**: `out/` directory
- **Main entry**: `./out/extension.js`

## Testing

Tests are located in `src/test/` and use the Mocha framework with `@vscode/test-electron`. The test configuration is defined in `.vscode-test.mjs`.

## Connection String

The `connectionString` variable in `extension.ts` should be configured with your Application Insights connection string for remote telemetry to function. Currently set to empty string for development.
