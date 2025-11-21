# VSCode Telemetry Extension

A Visual Studio Code extension demonstrating telemetry tracking using Azure Application Insights via the `vscode-extension-telemetry` package.

## Features

- Telemetry tracking using `vscode-extension-telemetry`
- Integration with Azure Application Insights
- Custom event tracking with properties and measurements
- Session and machine ID tracking
- Extension lifecycle telemetry

## Setup

### Prerequisites

- Visual Studio Code ^1.105.0
- Node.js 22.x
- Azure Application Insights resource

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set the instrumentation key via environment variable:
   ```bash
   export APPINSIGHTS_INSTRUMENTATIONKEY='your-application-insights-key'
   # or
   export INSTRUMENTATION_KEY='your-application-insights-key'
   ```
4. Compile the extension:
   ```bash
   npm run compile
   ```
5. Press `F5` to run the extension in debug mode

## Usage

### Commands

- **Hello World** (`vscode-telemetry.helloWorld`) - Demo command that sends a telemetry event

Access via Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)

### Telemetry Events

The extension tracks:
- `extensionActivated` - Fired when the extension starts
- `helloWorldCommand` - Fired when the Hello World command is executed

### Adding Custom Events

Use the `sendTelemetryEvent()` function:

```typescript
sendTelemetryEvent('eventName', 'componentName',
  { customProperty: 'value' },
  { customMeasurement: 123 }
);
```

## Architecture

### Core Components

- **TelemetryReporter** - Wrapper around `vscode-extension-telemetry`
- **sendTelemetryEvent()** - Helper function to send telemetry with common properties
- **getTelemetryProperties()** - Adds standard properties (timestamp, session ID, machine ID)

### Telemetry Data Structure

Each event includes:
- Event name
- Component name
- Custom properties (key-value pairs)
- Measurements (numeric values)
- Session ID and Machine ID (from VSCode environment)
- Timestamp (ISO 8601 format)

## Development

```bash
# Compile TypeScript
npm run compile

# Watch mode
npm run watch

# Lint code
npm run lint

# Package extension
vsce package
```

## Dependencies

- [vscode-extension-telemetry](https://www.npmjs.com/package/vscode-extension-telemetry) - Official telemetry library for VSCode extensions

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Resources

- [VSCode Extension Telemetry Guide](https://code.visualstudio.com/api/extension-guides/telemetry)
- [Application Insights Documentation](https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview)
- [vscode-extension-telemetry GitHub](https://github.com/Microsoft/vscode-extension-telemetry)

---

**Happy tracking!**
