import { Publisher, Subjects, TicketUpdatedEvent } from "@hrticketss/common";

export  class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}