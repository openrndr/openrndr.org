import * as React from "react";
import { IDatoEvent } from "../../types/index";

interface IProps {
  event: IDatoEvent;
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
