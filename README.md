# VSCode Telemetry Extension

A Visual Studio Code extension demonstrating telemetry tracking using Azure Application Insights via the `vscode-extension-telemetry` package. Features a clean, reusable architecture with helper functions for easy telemetry integration.

## Features

- **Reusable Telemetry Utilities** - Factory functions and helpers for consistent telemetry tracking
- **Rich Event Data** - Track custom properties and performance measurements
- **Component-based Tracking** - Organize telemetry by component for better insights
- **Azure Application Insights Integration** - Direct connection to Azure monitoring
- **Performance Metrics** - Built-in execution time and memory usage tracking

## Setup

### Prerequisites

- Visual Studio Code ^1.105.0
- Node.js 22.x
- Azure Application Insights connection string

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your Application Insights connection string in `src/extension.ts`:
   ```typescript
   const connectionString = 'your-connection-string-here';
   ```
4. Compile the extension:
   ```bash
   npm run compile
   ```
5. Press `F5` to run the extension in debug mode

## Usage

### Commands

- **Hello World** (`extension.helloWorld`) - Demo command that sends telemetry with performance metrics

Access via Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)

### API Reference

#### `createTelemetryReporter(context: ExtensionContext): TelemetryReporter`

Factory function to create and initialize a telemetry reporter instance.

**Parameters:**
- `context` - VSCode extension context for lifecycle management

**Returns:** Configured TelemetryReporter instance

**Example:**
```typescript
export function activate(context: vscode.ExtensionContext) {
    const reporter = createTelemetryReporter(context);
    // Use reporter for telemetry tracking
}
```

#### `sendTelemetryEvent(reporter, eventName, componentName, customDimensions?, measurements?)`

Helper function to send telemetry events with standardized structure.

**Parameters:**
- `reporter` - TelemetryReporter instance
- `eventName` - Name of the event to track
- `componentName` - Component that triggered the event
- `customDimensions` - Optional object with custom string properties
- `measurements` - Optional object with numeric measurements

**Example:**
```typescript
sendTelemetryEvent(
    reporter,
    'helloWorldCommand',
    'commandPalette',
    {
        source: 'command',
        userId: '123456',
        userName: 'yasithrashan'
    },
    {
        'performance.executionTime': Date.now(),
        'performance.memoryUsed': process.memoryUsage().heapUsed
    }
);
```

### Telemetry Events

The extension tracks:
- `helloWorldCommand` - Fired when the Hello World command is executed
  - Dimensions: source, userId, userName, component
  - Measurements: performance.executionTime, performance.memoryUsed

### Adding Custom Telemetry

1. Get the reporter instance (created during activation)
2. Call `sendTelemetryEvent()` with your event data:

```typescript
sendTelemetryEvent(
    reporter,
    'myCustomEvent',
    'myComponent',
    {
        action: 'buttonClick',
        feature: 'newFeature'
    },
    {
        'response.time': responseTime,
        'data.size': dataSize
    }
);
```

## Architecture

### Core Components

#### `createTelemetryReporter()`
Factory function that encapsulates TelemetryReporter initialization and lifecycle management. Automatically registers the reporter for disposal when the extension deactivates.

#### `sendTelemetryEvent()`
Standardized telemetry helper that:
- Adds component tracking to all events
- Merges custom dimensions with standard properties
- Ensures consistent event structure across the extension
- Supports both properties (strings) and measurements (numbers)

### Telemetry Data Structure

Each event includes:

**Standard Properties:**
- `component` - Component name (e.g., 'commandPalette', 'sidebar', 'webview')

**Custom Dimensions (strings):**
- Any additional context properties you provide
- Examples: userId, source, action, feature

**Measurements (numbers):**
- Performance metrics
- Usage statistics
- Any numeric data points

**Example Event Structure:**
```json
{
    "eventName": "helloWorldCommand",
    "properties": {
        "component": "commandPalette",
        "source": "command",
        "userId": "123456",
        "userName": "yasithrashan"
    },
    "measurements": {
        "performance.executionTime": 1732435200000,
        "performance.memoryUsed": 45678912
    }
}

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
