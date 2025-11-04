import * as vscode from 'vscode';
import { TelemetryReporter } from './telemetry-reporter';

export function activate(context: vscode.ExtensionContext) {

	const reporter = new TelemetryReporter(
		'http://localhost:3000/telemetry'
	);

	console.log('Extension "vscode-telemetry" is now active!');

	// Send telemetry event for extension activation
	try {
		reporter.sendEventData('initial.extension.activate', { 'Extension': 'Activated' });
	} catch (error) {
		const err = error instanceof Error ? error : new Error(String(error));
		reporter.sendErrorData(err);
	}


	// Send telemetry event when command is executed
	const disposable = vscode.commands.registerCommand('vscode-telemetry.helloWorld', () => {
		try {
			reporter.sendEventData('initial.extension.cmd.helloWorld', { 'triggerSource': 'commandPalette' });

			vscode.window.showInformationMessage('Hello World from vscode-telemetry!');
		} catch (error) {
			const err = error instanceof Error ? error : new Error(String(error));
			reporter.sendErrorData(err);
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
