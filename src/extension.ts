import * as vscode from 'vscode';
import { TelemetryReporter } from '@vscode/extension-telemetry';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = '';

let reporter: TelemetryReporter;

export function activate(context: vscode.ExtensionContext) {

    reporter = new TelemetryReporter(connectionString);
    context.subscriptions.push(reporter);

    const disposable = vscode.commands.registerCommand('extension.helloWorld', async () => {
        vscode.window.showInformationMessage('Hello World!');
        reporter.sendTelemetryEvent('helloWorldCommand', { 'source': 'command' }, { 'executionTime': Date.now() });
    });

    context.subscriptions.push(disposable);
}
