import React, { ReactNode } from "react";
import styled from "styled-components";
import { Menu } from "../menu";

interface Props {
  config?: any;
  children: any;
  activeSectionName?: string;
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 4fr;
`;

const Left = styled.div``;
const Right = styled.div``;

export const SectionBody = (props: Props) => {
  return (
    <Container>
      <Left>
        <Menu selection={props.config.path || ""} />
      </Left>
      <Right>{props.children}</Right>
    </Container>
  );
};
