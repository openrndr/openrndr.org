import * as React from "react";
import { IDatoEvent } from "../../types/index";

interface IProps {
  event: IDatoEvent;
}

import "./style.css";

const hasPassed = (event: IDatoEvent): boolean => {
  if (!event.startDate && !event.startDate) {
    return false;
  }
  const date = new Date(event.endDate || event.startDate);
  const now = new Date();
  return date < now;
};

export const EventBlock: React.SFC<IProps> = ({ event }) => (
  <div
    className={`event-block type-${event.eventType} ${
      hasPassed(event) ? "passed" : ""
    }`}
    itemType="http://schema.org/Event"
    itemScope
  >
    <span className={"event-date"}>
      {event.startDate && (
        <small itemProp={"startDate"}>
          {event.startDate
            .split("-")
            .reverse()
            .join("-")}
        </small>
      )}
      {event.endDate && (
        <small itemProp={"startDate"}>
          {" "}
          -{" "}
          {event.endDate
            .split("-")
            .reverse()
            .join("-")}
        </small>
      )}
    </span>
    <a href={event.link}>
      <div className={"event-title button"} itemProp={"name"}>
        {event.title
          .split(" ")
          .map((word, i) => <span key={`word-${i}`}>{word}</span>)}
      </div>
    </a>

    <span className={"event-note"} itemProp={"description"}>
      {event.note}
    </span>

    <div itemType={"http://schema.org/Place"}>
      {event.address ? (
        <p
          className={"location-address"}
          dangerouslySetInnerHTML={{ __html: event.address }}
          itemProp={"address"}
        />
      ) : (
        <p
          className={"location-address"}
          itemProp={"address"}
          style={{ display: "none" }}
        >
          Paviljoensgracht 20, 2512 BP Den Haag
        </p>
      )}
    </div>
  </div>
);
