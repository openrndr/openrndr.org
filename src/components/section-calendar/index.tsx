import * as React from "react";

import "./style.css";
import { ICalendarProps } from "../../types/props";
import { EventBlock } from "../event-block/index";

interface IProps {
  data: ICalendarProps;
}

export const SectionCalendar: React.SFC<IProps> = ({ data }) => {
  const { events } = data;

  return (
    <section className={`xx-x-x`}>
      {events.data.map((event, i) => (
        <EventBlock key={`event-${i}`} event={event} />
      ))}
    </section>
  );
};
