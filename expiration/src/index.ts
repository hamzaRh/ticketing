import { OrderCreatedListner } from "./events/listeners/order-created-listener";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  console.log('Starts....');
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined");
  }

  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be defined");
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined");
  }

  try {
    // clusterid is coming from nats-depl config && url is coming from nats-sr config
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS conenction closed!");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close()); // INT = interruption
    process.on("SIGTERM", () => natsWrapper.client.close()); // TERM = termination

    new OrderCreatedListner(natsWrapper.client).listen();
  } catch (error) {
    console.error(error);
  }
};

start();
