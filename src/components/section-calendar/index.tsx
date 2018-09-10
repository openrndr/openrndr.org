import * as React from "react";
import { groupBy } from "lodash";

import "./style.css";
import { EventBlock } from "../event-block/index";
import { Calendar } from "../../types";

const expectedTypes: [string, string][] = [
  ["event", "events"],
  ["workshop", "workshops"],
  ["exhibition", "exhibitions"]
];

export const SectionCalendar: React.SFC<{ data: Calendar }> = ({ data }) => {
  const groups = groupBy(data.events, "eventType");
  const elements = expectedTypes
    .filter(([key]) => groups[key] && groups[key].length > 0)
    .map(([key, title]) => {
      const items = groups[key];
      return (
        <div key={`event-group-${key}`} className={"event-group"}>
          <h3>{title}</h3>
          <br />
          {items.map((event, i) => (
            <EventBlock key={`event-${i}`} event={event} />
          ))}
        </div>
      );
    });
  return <section className={`calendar-section xx-x-x`}>{elements}</section>;
};
