import React, { ReactNode } from "react";
import styled from "styled-components";
import { TextBlock as TextBlockType } from "../../../types";
import TextBlock from "../text-block";

const Container = styled.div`
  display: grid;
  &.columns-2 {
    grid-template-columns: 1fr 1fr;
  }
  &.columns-3 {
    grid-template-columns: 2fr 1fr 1fr;
  }
  &.columns-4 {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

interface Props {
  data: TextBlockType[];
  className?: string;
}

export default (props: Props) => {
  return (
    <Container className={props.className}>
      {props.data.map(cb => {
        return <TextBlock data={cb} />;
      })}
    </Container>
  );
};
