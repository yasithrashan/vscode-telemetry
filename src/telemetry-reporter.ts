import * as vscode from 'vscode';

export class TelemetryReporter implements vscode.TelemetrySender {

    private apiEndpoint: string;

    constructor(apiEndpoint: string) {
        this.apiEndpoint = apiEndpoint;
    }

    sendEventData(eventName: string, data?: Record<string, any>): void {
        console.log(`Event : ${eventName}`, data);

        this.sendToApi({
            type: 'event',
            eventName,
            data,
            timeStamp: new Date().toDateString()
        });
    }
    sendErrorData(error: Error, data?: Record<string, any>): void {
        this.sendToApi({
            type: 'Error',
            error,
            data,
            timeStamp: new Date().toDateString()
        });
    }
    flush?(): void | Thenable<void> {
        console.log(`Flushing telemetry data`);
    }

    private async sendToApi(payload: any): Promise<void> {
        try {
            await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        } catch (error) {
            console.error(`Failed to send telemetry ${error}`);
        }
    }

}