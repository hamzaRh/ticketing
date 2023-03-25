import { Publisher, Subjects, TicketCreatedEvent } from "@hrticketss/common";

export  class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}