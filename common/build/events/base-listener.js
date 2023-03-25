"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
class Listener {
    constructor(client) {
        this.ackwait = 5 * 1000;
        this.client = client;
    }
    subscriptionsOptions() {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable() // get all events emiited in the past
            .setManualAckMode(true)
            .setAckWait(this.ackwait)
            .setDurableName(this.queueGroupName); // make sure that we keep track of the events got missed
    }
    listen() {
        const subscription = this.client.subscribe(this.subject, this.queueGroupName, // coupled with setDeliverAllAvailable and setDurableName
        this.subscriptionsOptions());
        subscription.on("message", (msg) => {
            console.log(`Message recieved: ${this.subject} / ${this.queueGroupName}`);
            const parsedData = this.parseMessage(msg);
            this.onMessage(parsedData, msg);
        });
    }
    parseMessage(msg) {
        const data = msg.getData();
        return typeof data === "string"
            ? JSON.parse(data)
            : JSON.parse(data.toString("utf8"));
    }
}
exports.Listener = Listener;
