import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatediLstener } from "./events/ticket-created-listener";

console.clear();

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS conenction closed!");
    process.exit();
  });

  new TicketCreatediLstener(stan).listen();
});

process.on("SIGINT", () => stan.close()); // INT = interruption
process.on("SIGTERM", () => stan.close()); // TERM = termination




