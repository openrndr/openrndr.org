import * as React from "react";
import { IDatoEvent } from "../../types/index";

interface IProps {
  event: IDatoEvent;
}

import "./style.css";

export const EventBlock: React.SFC<IProps> = ({ event }) => (
  <div>
    <div>
      <strong>{event.title}</strong>
      <br />
    </div>
    <div>{event.note}</div>
    <div>
      <a href={event.link}>Event page</a>
    </div>
  </div>
);
