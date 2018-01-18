import React, { ReactNode } from "react";
import styled from "styled-components";
import Menu from "../menu";

interface Props {
  name: string;
  children: any;
}

const SectionBody = styled.div`
  width: 100%;
  background: blue;
  display: grid;
  grid-template-columns: 1fr 4fr;
`;

const Left = styled.div`
  background: green;
`;

const Right = styled.div`
  background: orange;
`;

export default (props: Props) => {
  return (
    <SectionBody>
      <Left>
        <Menu selection={props.name} />
      </Left>
      <Right>{props.children}</Right>
    </SectionBody>
  );
};
