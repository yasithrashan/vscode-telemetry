import * as vscode from "vscode";

export interface TelemetryEventPayload {
    eventName: string;
    componentName: string;
    customDimensions?: { [key: string]: string };
    measurements?: { [key: string]: number };
}

export class TelemetryEventEmitter {
    private static _instance: TelemetryEventEmitter;
    private _emitter: vscode.EventEmitter<TelemetryEventPayload>;

    private constructor() {
        this._emitter = new vscode.EventEmitter<TelemetryEventPayload>();
    }

    // use singleton instance
    public static get instance(): TelemetryEventEmitter {
        if (!this._instance) {
            this._instance = new TelemetryEventEmitter();
        }
        return this._instance;
    }

    public get onDidFire(): vscode.Event<TelemetryEventPayload> {
        return this._emitter.event;
    }

    public fire(payload: TelemetryEventPayload) {
        this._emitter.fire(payload);
    }
}
