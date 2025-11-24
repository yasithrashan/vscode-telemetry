import * as vscode from 'vscode';
import { TelemetryReporter } from '@vscode/extension-telemetry';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = '';
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

    const disposable = vscode.commands.registerCommand('extension.helloWorld', async () => {
        vscode.window.showInformationMessage('Hello World!');
        sendTelemetryEvent(
            reporter,
            'helloWorldCommand',
            'commandPalette',
            {
                'source': 'command',
                'userId': '123456',
                'userName': 'yasithrashan',
            },
            {
                'performance.executionTime': Date.now(),
                'performance.memoryUsed': process.memoryUsage().heapUsed
            }
        );
    });

    context.subscriptions.push(disposable);
}
