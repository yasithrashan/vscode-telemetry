import * as vscode from 'vscode';
import { env } from 'vscode';
import TelemetryReporter from 'vscode-extension-telemetry';

const INSTRUMENTATION_KEY = process.env.APPINSIGHTS_INSTRUMENTATIONKEY || process.env.INSTRUMENTATION_KEY || '';

let reporter: TelemetryReporter;

export function createTelemetryReporter(context: vscode.ExtensionContext): TelemetryReporter {
	const extensionId = context.extension.id;
	const extensionVersion = context.extension.packageJSON.version;

	const telemetryReporter = new TelemetryReporter(extensionId, extensionVersion, INSTRUMENTATION_KEY);
	context.subscriptions.push(telemetryReporter);
	return telemetryReporter;
}

export function sendTelemetryEvent(eventName: string, componentName: string, customDimensions: { [key: string]: string } = {},
	measurements: { [key: string]: number } = {}) {
	if (!reporter) {
		console.warn('Telemetry reporter not initialized');
		return;
	}
	const telemetryProperties = getTelemetryProperties(componentName, customDimensions);
	reporter.sendTelemetryEvent(eventName, telemetryProperties, measurements);
}


export function getTelemetryProperties(
	component: string,
	params: { [key: string]: string } = {}
): { [key: string]: any } {
	return {
		...params,
		component: component,
		timestamp: new Date().toISOString(),
		local: {
			sessionID: env.sessionId,
			machineID: env.machineId
		}
	};
}

export function activate(context: vscode.ExtensionContext) {
	console.log('[Extension] is now active!');

	reporter = createTelemetryReporter(context);

	sendTelemetryEvent('extensionActivated', 'extension', {
		extensionId: context.extension.id,
		extensionVersion: context.extension.packageJSON.version
	});

	const disposable = vscode.commands.registerCommand('vscode-telemetry.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from vscode-telemetry!');

		sendTelemetryEvent('helloWorldCommand', 'commands', {
			commandId: 'vscode-telemetry.helloWorld'
		});
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {
	if (reporter) {
		reporter.dispose();
	}
}
