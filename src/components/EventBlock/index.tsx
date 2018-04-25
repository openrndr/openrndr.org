import * as React from "react";

import { Event } from "../types";

interface IProps {
  event: Event;
}

export const EventBlock: React.SFC<IProps> = ({ event }) => (
  <div>
    <div>
      <h3>{event.title}</h3>
      <br />
    </div>
    <div>{event.note}</div>
    <div>
      <a href={event.link}>Event page</a>
    </div>
  </div>
);
