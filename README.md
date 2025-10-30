# VSCode Telemetry Extension

A Visual Studio Code extension that implements dual telemetry tracking - sending events to Application Insights while simultaneously logging to a local JSON file for debugging and analysis.

## Overview

This extension demonstrates a comprehensive telemetry solution that:
- Sends telemetry events to Azure Application Insights for production monitoring
- Logs all telemetry data to a local JSON file (`.telemetry/telemetry.json`) for development and debugging
- Provides commands to interact with and view telemetry data

## Features

- **Dual Telemetry Logging**: Simultaneously sends events to Application Insights and writes to local JSON file
- **Local Telemetry Viewer**: Built-in command to view the local telemetry log file
- **Structured Event Data**: All events include timestamps, event names, properties, and measurements
- **Development-Friendly**: Local `.telemetry/` folder makes debugging easy during development
- **Production-Ready**: Integration with Azure Application Insights for production monitoring

## Installation

### For Development

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Compile the TypeScript code:
   ```bash
   npm run compile
   ```
4. Press `F5` in VSCode to run the extension in debug mode

### For Use

Install from the VSCode marketplace (once published) or install the `.vsix` package manually.

## Usage

### Commands

The extension provides two commands accessible via the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`):

- **Hello World** - Demo command that sends a telemetry event
- **View Telemetry** - Opens the local telemetry JSON file in the editor

### Configuration

To enable remote telemetry to Application Insights:

1. Open [src/extension.ts](src/extension.ts)
2. Set the `connectionString` variable to your Application Insights connection string:
   ```typescript
   const connectionString = 'InstrumentationKey=your-key-here;...';
   ```

Without a connection string, the extension will still log all events locally to `.telemetry/telemetry.json`.

## Architecture

### Dual-Logging System

The extension implements a dual-logging approach in [src/extension.ts](src/extension.ts):

1. **Remote Telemetry**: Uses `TelemetryReporter` from `@vscode/extension-telemetry` to send events to Application Insights
2. **Local Logging**: Simultaneously writes telemetry events to a JSON file

The `sendTelemetryWithLog()` helper function handles both operations atomically.

### Event Structure

All telemetry events include:
- `timestamp` (ISO 8601 format)
- `eventName` (string identifier)
- `properties` (key-value pairs of string data)
- `measurements` (key-value pairs of numeric data)

Example event:
```json
{
  "timestamp": "2025-10-30T10:30:45.123Z",
  "eventName": "helloWorldCommand",
  "properties": {
    "triggerSource": "commandPalette"
  },
  "measurements": {}
}
```

### Storage Location

Telemetry data is stored in `.telemetry/telemetry.json` at the extension's root directory. This location:
- Makes telemetry data easily accessible during development
- Is excluded from git via `.gitignore`
- Provides a convenient location for debugging and local analysis

### Tracked Events

The extension currently tracks:
- `extensionActivated` - Fired when the extension activates
- `helloWorldCommand` - Fired when the Hello World command is executed
- `ViewTelemetryCommand` - Fired when the View Telemetry command is executed

## Development

### Build Commands

```bash
# Compile TypeScript
npm run compile

# Watch mode for development (auto-recompile on changes)
npm run watch

# Lint code
npm run lint

# Run tests
npm run test

# Prepare for publishing
npm run vscode:prepublish
```

### Project Structure

```
vscode-telemetry/
├── .telemetry/           # Local telemetry logs (gitignored)
│   └── telemetry.json    # JSON file with all telemetry events
├── src/
│   ├── extension.ts      # Main extension code with telemetry implementation
│   └── test/             # Test files
├── out/                  # Compiled JavaScript output
├── package.json          # Extension manifest and dependencies
└── tsconfig.json         # TypeScript configuration
```

### Adding New Telemetry Events

To add telemetry tracking to new features:

```typescript
sendTelemetryWithLog('yourEventName',
  { 'property1': 'value1', 'property2': 'value2' },
  { 'measurement1': 123, 'measurement2': 456 }
);
```

## Dependencies

- **[@vscode/extension-telemetry](https://www.npmjs.com/package/@vscode/extension-telemetry)** (^1.1.0) - Official VSCode telemetry library
- **TypeScript** (^5.9.3) - Language and compiler
- **ESLint** (^9.36.0) - Code linting
- **Mocha** - Testing framework

## Requirements

- Visual Studio Code ^1.105.0
- Node.js 22.x
- TypeScript 5.9.3+

## Known Issues

- Connection string is hardcoded in source - consider moving to configuration settings for production use
- No error handling for JSON file write failures
- Telemetry file can grow unbounded - consider implementing rotation or size limits

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Release Notes

### 0.0.1

- Initial release
- Dual telemetry logging (Application Insights + local JSON)
- Hello World demo command with telemetry
- View Telemetry command to inspect local logs
- Local storage in `.telemetry/` folder

---

**Enjoy tracking your extension's telemetry!**
