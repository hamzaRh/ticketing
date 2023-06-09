import { OrderCancelledEvent, Publisher, Subjects } from "@hrticketss/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
