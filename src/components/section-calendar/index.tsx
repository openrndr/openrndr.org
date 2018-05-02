import * as React from "react";
import { groupBy } from "lodash";

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
  const groups = groupBy(events.data, "eventType");

  return (
    <section className={`calendar-section xx-x-x`}>
      {Object.keys(groups).map(groupKey => (
        <div key={`event-group-${groupKey}`} className={"event-group"}>
          <h3>{groupKey}</h3>
          <br />
          {groups[groupKey].map((event, i) => (
            <EventBlock key={`event-${i}`} event={event} />
          ))}
        </div>
      ))}
    </section>
  );
};
