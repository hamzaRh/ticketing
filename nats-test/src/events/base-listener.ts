import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract subject: T['subject'];
  abstract queueGroupName: string;
  abstract onMessage(data: T['data'], msg: Message): void;
  private client: Stan;
  protected ackwait = 5 * 1000;

  constructor(client: Stan) {
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
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName, // coupled with setDeliverAllAvailable and setDurableName
      this.subscriptionsOptions()
    );

    subscription.on("message", (msg: Message) => {
      console.log(`Message recieved: ${this.subject} / ${this.queueGroupName}`);

      const parsedData = this.parseMessage(msg);

      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}
