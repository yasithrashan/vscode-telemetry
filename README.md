# VSCode Telemetry Extension

A Visual Studio Code extension demonstrating telemetry tracking using Azure Application Insights with an event-driven architecture.

## Features

- Event-driven telemetry using `TelemetryEventEmitter`
- Clean, reusable API for tracking events
- Component-based organization
- Azure Application Insights integration

## Setup

1. Clone and install dependencies:
   ```bash
   npm install
   ```

2. Add your Application Insights connection string in [src/extension.ts](src/extension.ts):
   ```typescript
   const connectionString = 'your-connection-string-here';
   ```

3. Run the extension:
   ```bash
   npm run compile
   # Press F5 to debug
   ```

## Usage

### Sending Telemetry Events

Use the `TelemetryEventEmitter` to fire events from anywhere in your extension:

```typescript
import { TelemetryEventEmitter } from './event-emitter';

TelemetryEventEmitter.instance.fire({
    eventName: 'myEvent',
    componentName: 'myComponent',
    customDimensions: {
        action: 'buttonClick',
        feature: 'newFeature'
    },
    measurements: {
        executionTime: 123,
        memoryUsed: 456789
    }
});
```

### API Reference

#### `TelemetryEventEmitter`

Singleton event emitter for telemetry events.

**Methods:**
- `fire(payload)` - Fire a telemetry event
- `onDidFire(listener)` - Listen for telemetry events

#### `createTelemetryReporter(context)`

Creates and initializes a telemetry reporter.

#### `sendTelemetryEvent(reporter, eventName, componentName, customDimensions?, measurements?)`

Sends a telemetry event to Application Insights.

## Architecture

The extension uses an event-driven architecture:

1. Components fire telemetry events using `TelemetryEventEmitter`
2. The extension listens for these events during activation
3. Events are forwarded to Azure Application Insights via the reporter

This pattern decouples telemetry logic from business logic, making code cleaner and more maintainable.

## Development

```bash
npm run compile  # Compile TypeScript
npm run watch    # Watch mode
npm run lint     # Lint code
```

## License

[MIT](LICENSE)
