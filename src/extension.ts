// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { TelemetryReporter } from '@vscode/extension-telemetry';
import * as fs from 'fs';
import * as path from 'path';

const connectionString = '';

// Telemetry reporter instance
let reporter: TelemetryReporter;
let telemetryFilePath: string;

/**
 * Helper function to send telemetry event and save to JSON file
 */
function sendTelemetryWithLog(
	eventName: string,
	properties?: { [key: string]: string },
	measurements?: { [key: string]: number }
) {
	// Send to telemetry reporter
	reporter.sendTelemetryEvent(eventName, properties, measurements);

	// Save to JSON file
	const telemetryEntry = {
		timestamp: new Date().toISOString(),
		eventName: eventName,
		properties: properties || {},
		measurements: measurements || {}
	};

	try {
		let telemetryData: any[] = [];

		// Read existing data if file exists
		if (fs.existsSync(telemetryFilePath)) {
			const fileContent = fs.readFileSync(telemetryFilePath, 'utf8');
			if (fileContent.trim()) {
				telemetryData = JSON.parse(fileContent);
			}
		}

		// Add new entry
		telemetryData.push(telemetryEntry);

		// Write back to file
		fs.writeFileSync(telemetryFilePath, JSON.stringify(telemetryData, null, 2), 'utf8');
		console.log('Telemetry saved to:', telemetryFilePath);
	} catch (error) {
		console.error('Error saving telemetry to file:', error);
	}
}

export function activate(context: vscode.ExtensionContext) {

	reporter = new TelemetryReporter(connectionString);
	// Ensure proper disposal - events will be flushed when extension deactivates
	context.subscriptions.push(reporter);

	const extensionPath = context.extensionPath;
	const telemetryFolderPath = path.join(extensionPath, '.telemetry');
	telemetryFilePath = path.join(telemetryFolderPath, 'telemetry.json');

	if (!fs.existsSync(telemetryFolderPath)) {
		fs.mkdirSync(telemetryFolderPath, { recursive: true });
	}

	console.log('Extension "vscode-telemetry" is now active!');

	// Send telemetry event for extension activation
	sendTelemetryWithLog('extensionActivated');

	const disposable = vscode.commands.registerCommand('vscode-telemetry.helloWorld', () => {
		// Send telemetry event when command is executed
		sendTelemetryWithLog('helloWorldCommand',
			{ 'triggerSource': 'commandPalette' }
		);

		vscode.window.showInformationMessage('Hello World from vscode-telemetry!');
	});

	// Command to view telemetry file
	const viewTelemetryCommand = vscode.commands.registerCommand('vscode-telemetry.viewTelemetry', async () => {
		if (fs.existsSync(telemetryFilePath)) {
			const doc = await vscode.workspace.openTextDocument(telemetryFilePath);
			await vscode.window.showTextDocument(doc);
			sendTelemetryWithLog('ViewTelemetryCommand',
				{ 'triggerSource': 'commandPalette' }
			);

		} else {
			vscode.window.showInformationMessage('No telemetry data found yet.');
		}
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(viewTelemetryCommand);
}

// This method is called when your extension is deactivated
export function deactivate() { }
