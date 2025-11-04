import * as vscode from 'vscode';
import { TelemetryReporter } from './telemetry-reporter';

let telemetryLogger: vscode.TelemetryLogger | undefined;


export function activate(context: vscode.ExtensionContext) {

	const sender = new TelemetryReporter(
		'http://localhost:3000/telemetry'
	);

	telemetryLogger = vscode.env.createTelemetryLogger(sender, {
		additionalCommonProperties: {
			'extensionVersion': '0.1.1'
		}
	});

	console.log('Extension "vscode-telemetry" is now active!');

	// Send telemetry event for extension activation
	try {
		telemetryLogger?.logUsage('initial.extension.activate', { 'Extension': 'Activated' });
	} catch (error) {
		const err = error instanceof Error ? error : new Error(String(error));
		telemetryLogger?.logUsage('initial.extension.activate.error', { 'message': err.message, 'stack': err.stack ?? '' });
	}

	// Send telemetry event when command is executed
	const disposable = vscode.commands.registerCommand('vscode-telemetry.helloWorld', () => {
		try {
			telemetryLogger?.logUsage('initial.extension.cmd.helloWorld', { 'triggerSource': 'commandPalette' });

			vscode.window.showInformationMessage('Hello World from vscode-telemetry!');
		} catch (error) {
			const err = error instanceof Error ? error : new Error(String(error));
			telemetryLogger?.logUsage('initial.extension.cmd.helloWorld.error', { 'message': err.message, 'stack': err.stack ?? '' });
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
