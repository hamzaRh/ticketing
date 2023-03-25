import { ExpirationCompleteEvent, Publisher, Subjects } from "@hrticketss/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
