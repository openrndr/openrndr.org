import React, { ReactNode } from "react";
import styled from "styled-components";
import { TextBlock as TextBlockType } from "../../../types";
import TextBlock from "../text-block";

const Container = styled.div`
  background: grey;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

interface Props {
  data: TextBlockType[];
}

export default (props: Props) => {
  return (
    <Container>
      {props.data.map(cb => {
        return <TextBlock data={cb} />;
      })}
    </Container>
  );
};
