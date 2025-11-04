# VSCode Telemetry Extension

A Visual Studio Code extension that implements telemetry tracking using VSCode's native TelemetryLogger API with a custom HTTP sender for monitoring and analysis.

## Overview

This extension demonstrates a telemetry solution that:
- Uses VSCode's native TelemetryLogger API for standardized telemetry
- Implements a custom TelemetrySender to send events to an HTTP API endpoint
- Includes a local Express server for testing and development
- Provides structured event tracking with common properties

## Features

- **Native TelemetryLogger**: Uses VSCode's built-in TelemetryLogger API for standardized telemetry
- **Custom HTTP Sender**: Implements TelemetrySender interface to send data to HTTP endpoints
- **Common Properties**: Support for adding extension-wide metadata like version numbers
- **Test Server Included**: Express-based test server to capture and display telemetry locally
- **Development-Friendly**: Simple architecture that's easy to understand and extend

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

### Starting the Test Server

Before testing the extension, start the included Express test server:

```bash
node test-server.js
```

This starts a server on `http://localhost:3000` that captures and displays telemetry events in the console.

### Commands

The extension provides a command accessible via the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`):

- **Hello World** - Demo command that sends a telemetry event

### Configuration

To change the telemetry endpoint or common properties:

1. Open [src/extension.ts](src/extension.ts)
2. Update the API endpoint in the TelemetryReporter constructor:
   ```typescript
   const sender = new TelemetryReporter('http://your-api.com/telemetry');
   ```
3. Modify common properties in the TelemetryLogger creation:
   ```typescript
   telemetryLogger = vscode.env.createTelemetryLogger(sender, {
     additionalCommonProperties: {
       'extensionVersion': '0.1.1'
     }
   });
   ```

The default endpoint is `http://localhost:3000/telemetry` for local testing.

## Architecture

### Telemetry Implementation

The extension uses VSCode's native TelemetryLogger API with a custom HTTP sender:

#### 1. Native TelemetryLogger ([src/extension.ts](src/extension.ts))

Uses `vscode.env.createTelemetryLogger()` with:
- Custom TelemetrySender implementation for HTTP transport
- Additional common properties (e.g., extension version)
- Standardized logging methods (`logUsage`, `logError`)

#### 2. TelemetryReporter Class ([src/telemetry-reporter.ts](src/telemetry-reporter.ts))

Implements VSCode's `TelemetrySender` interface with three methods:
- `sendEventData(eventName, data)` - Sends event telemetry
- `sendErrorData(error, data)` - Sends error telemetry
- `flush()` - Optional flush method for batching

All telemetry is sent via HTTP POST to the configured API endpoint.

#### 3. Test Server ([test-server.js](test-server.js))

A simple Express server that:
- Listens on port 3000
- Receives POST requests at `/telemetry`
- Logs all received telemetry to the console
- Returns success responses to the extension

### Telemetry Payload Structure

**Event Data:**
```json
{
  "type": "event",
  "eventName": "initial.extension.activate",
  "data": {
    "Extension": "Activated"
  },
  "timeStamp": "Mon Nov 04 2025"
}
```

**Error Data:**
```json
{
  "type": "Error",
  "error": {
    "message": "Error message",
    "stack": "..."
  },
  "data": {},
  "timeStamp": "Mon Nov 04 2025"
}
```

### Tracked Events

The extension currently tracks:
- `initial.extension.activate` - Fired when the extension activates
- `initial.extension.activate.error` - Fired when activation fails
- `initial.extension.cmd.helloWorld` - Fired when the Hello World command is executed
- `initial.extension.cmd.helloWorld.error` - Fired when the command fails

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
├── src/
│   ├── extension.ts           # Main extension activation and commands
│   ├── telemetry-reporter.ts  # Custom TelemetryReporter implementation
│   └── test/                  # Test files
├── test-server.js             # Express server for testing telemetry
├── out/                       # Compiled JavaScript output
├── package.json               # Extension manifest and dependencies
└── tsconfig.json              # TypeScript configuration
```

### Adding New Telemetry Events

To track events in your extension using the TelemetryLogger:

```typescript
// Track a usage event
telemetryLogger?.logUsage('your.event.name', {
  'property1': 'value1',
  'property2': 'value2'
});

// Track an error event
try {
  // Your code
} catch (error) {
  const err = error instanceof Error ? error : new Error(String(error));
  telemetryLogger?.logUsage('your.event.name.error', {
    'message': err.message,
    'stack': err.stack ?? ''
  });
}
```

## Dependencies

### Runtime Dependencies
- **[express](https://www.npmjs.com/package/express)** (^5.1.0) - Web framework for the test server
- **[body-parser](https://www.npmjs.com/package/body-parser)** (^2.2.0) - Request body parsing middleware

### Development Dependencies
- **TypeScript** (^5.9.3) - Language and compiler
- **ESLint** (^9.36.0) - Code linting
- **Mocha** - Testing framework
- **[@types/vscode](https://www.npmjs.com/package/@types/vscode)** - VSCode API type definitions

## Requirements

- Visual Studio Code ^1.105.0
- Node.js 22.x
- TypeScript 5.9.3+

## Known Issues

- API endpoint is hardcoded in source - consider moving to configuration settings
- Network errors are logged to console but not surfaced to the user
- No retry mechanism for failed telemetry sends
- Test server logs to console only - no persistent storage

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Release Notes

### 0.1.1

- Integrated VSCode's native TelemetryLogger API
- Added support for common properties (extension version)
- Updated to use standardized `logUsage` method
- Improved error tracking with structured error events

### 0.0.1

- Initial release
- Custom TelemetryReporter implementing VSCode's TelemetrySender interface
- HTTP POST-based telemetry to configurable endpoint
- Express test server for local telemetry capture
- Event and error tracking with structured data
- Hello World demo command with telemetry

---

**Enjoy tracking your extension's telemetry!**