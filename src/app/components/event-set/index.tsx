import React from "react";
import styled from "styled-components";
import { Event } from "../../../types";
import { EventBlock } from "../event-block";

const Container = styled.div`
  padding: 20px;
  h3 {
    text-transform: uppercase;
  }
`;

interface Props {
  title: string;
  events: Event[];
}

export const EventSet = (props: Props) => {
  return (
    <Container>
      <div>
        <h3>{props.title}</h3>
      </div>
      {props.events.map((object, i) => (
        <EventBlock event={object}>{i}</EventBlock>
      ))}
      <div>More</div>
    </Container>
  );
};
