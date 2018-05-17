import * as React from "react";
import { IDatoEvent } from "../../types/index";

interface IProps {
  event: IDatoEvent;
}

import "./style.css";

export const EventBlock: React.SFC<IProps> = ({ event }) => (
  <p className={`event-block type-${event.eventType}`}>
    <span className={"event-date"}>
      {event.startDate && (
        <small>
          {event.startDate
            .split("-")
            .reverse()
            .join("-")}
        </small>
      )}
      {event.endDate && (
        <small>
          {" "}
          -{" "}
          {event.endDate
            .split("-")
            .reverse()
            .join("-")}
        </small>
      )}
    </span>
    <br />
    <a href={event.link}>
      <strong className={"event-title"}>{event.title}</strong>
    </a>
    <br />
    <span className={"event-note"}>{event.note}</span>
    {event.address && (
      <p
        className={"location-address"}
        dangerouslySetInnerHTML={{ __html: event.address }}
      />
    )}
  </p>
);
