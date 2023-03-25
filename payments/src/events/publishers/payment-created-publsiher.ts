import { Publisher, Subjects, PaymentCreatedEvent } from "@hrticketss/common";

export  class PaymentcreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentCreated;
}