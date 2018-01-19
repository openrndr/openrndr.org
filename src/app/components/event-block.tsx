import React from "react";
import styled from "styled-components";
import { Event } from "../../types";

const Container = styled.div``;

interface Props {
  event: Event;
}

export default (props: Props) => {
  return (
    <Container>
      <div>
        <h3>{props.event.title}</h3>
      </div>
      <div>{props.event.note}</div>
      <div>
        <a href={props.event.link}>Event page</a>
      </div>
    </Container>
  );
};
