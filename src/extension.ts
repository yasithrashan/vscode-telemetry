import * as vscode from 'vscode';
import { TelemetryReporter } from '@vscode/extension-telemetry';

const connectionString = '';

let reporter: TelemetryReporter;

export function activate(context: vscode.ExtensionContext) {
	console.log('[Extension] is now active!');
	reporter = new TelemetryReporter(connectionString);
	context.subscriptions.push(reporter);
	// Send telemetry event
	reporter.sendTelemetryEvent('extensionActivated', { 'extensionId': context.extension.id }, { 'extensionVersion': context.extension.packageJSON.version });

	const disposable = vscode.commands.registerCommand('vscode-telemetry.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from vscode-telemetry!');
		// Send telemetry event
		reporter.sendTelemetryEvent('helloWorldCommand', { 'commandId': 'vscode-telemetry.helloWorld' });
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {
}
