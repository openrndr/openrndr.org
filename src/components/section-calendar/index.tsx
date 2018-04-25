import * as React from "react";

import "./style.css";
import { EventBlock } from "../event-block/index";
import { Paged, IDatoEvent } from "../../types";

export interface ICalendarProps {
  data: {
    events: Paged<IDatoEvent>;
  };
}

export const SectionCalendar: React.SFC<ICalendarProps> = ({ data }) => {
  const { events } = data;

  return (
    <section className={`xx-x-x`}>
      {events.data.map((event, i) => (
        <EventBlock key={`event-${i}`} event={event} />
      ))}
    </section>
  );
};
