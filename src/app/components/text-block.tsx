import React from "react";
import styled from "styled-components";
import Config from "../config";
import { TextBlock } from "../../types";

const Container = styled.div`
  background: purple;
`;

interface Props {
  data: TextBlock;
}

export default (props: Props) => {
  return (
    <Container>
      <div>{props.data.title}</div>
      <div>{props.data.bodyText}</div>
      <div>{props.data.link}</div>
    </Container>
  );
};
