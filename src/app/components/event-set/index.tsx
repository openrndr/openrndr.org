import React from "react";
import styled from "styled-components";
import { Event } from "../../../types";
import EventBlock from "../event-block";

const Container = styled.div`
  background: grey;
`;

interface Props {
  title: string;
  events: Event[];
}

export default (props: Props) => {
  return (
    <Container>
      <div>
        <b>{props.title}</b>
      </div>
      {props.events.map((object, i) => (
        <EventBlock event={object}>{i}</EventBlock>
      ))}
    </Container>
  );
};
