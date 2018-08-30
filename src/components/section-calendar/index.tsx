import * as React from "react";
import { groupBy } from "lodash";

import "./style.css";
import { EventBlock } from "../event-block/index";
import { Calendar } from "../../types";

export const SectionCalendar: React.SFC<{ data: Calendar }> = ({ data }) => {
  const groups = groupBy(data.events, "eventType");
  return (
    <section className={`calendar-section xx-x-x`}>
      {Object.keys(groups)
        .filter(groupKey => groups[groupKey].length > 0)
        .map(groupKey => (
          <div key={`event-group-${groupKey}`} className={"event-group"}>
            <h3>{groupKey === "event" ? "events" : groupKey}</h3>
            <br />
            {groups[groupKey].map((event, i) => (
              <EventBlock key={`event-${i}`} event={event} />
            ))}
          </div>
        ))}
    </section>
  );
};
