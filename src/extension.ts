import * as vscode from 'vscode';
import { TelemetryReporter } from '@vscode/extension-telemetry';
import { TelemetryEventEmitter } from './event-emitter';

const connectionString = 'e8a19758-77cc-433f-b9fd-416bdce00bf3';
let reporter: TelemetryReporter;

export function createTelemetryReporter(context: vscode.ExtensionContext): TelemetryReporter {
    const telemetryReporter = new TelemetryReporter(connectionString);
    context.subscriptions.push(telemetryReporter);
    return telemetryReporter;
}

export function sendTelemetryEvent(
    reporter: TelemetryReporter,
    eventName: string,
    componentName: string,
    customDimensions: { [key: string]: string } = {},
    measurements: { [key: string]: number } = {}
) {
    const telemetryProperties = {
        component: componentName,
        ...customDimensions
    };

    reporter.sendTelemetryEvent(eventName, telemetryProperties, measurements);
}

export function activate(context: vscode.ExtensionContext) {
    reporter = createTelemetryReporter(context);

    // Listern for fired telemetry events
    TelemetryEventEmitter.instance.onDidFire((payload) => {
        sendTelemetryEvent(
            reporter,
            payload.eventName,
            payload.componentName,
            payload.customDimensions ?? {},
            payload.measurements ?? {}
        );
    });

    const disposable = vscode.commands.registerCommand('extension.helloWorld', async () => {
        vscode.window.showInformationMessage('Hello World!');

        TelemetryEventEmitter.instance.fire({
            eventName: 'helloWorldCommand',
            componentName: 'commandPalette',
            customDimensions: {
                source: 'command',
                userId: '123456',
                userName: 'yasithrashan'
            },
            measurements: {
                executionTime: Date.now(),
                memoryUsed: process.memoryUsage().heapUsed
            }
        });
    });

    context.subscriptions.push(disposable);
}
