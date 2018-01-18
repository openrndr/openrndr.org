import React, { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  name: string;
  children: ReactNode[];
}

const Section = styled.section`
  background: blue;
  display: grid;
  grid-gap: 1em;
  grid-template-areas:
    "header"
    "body";
`;

export default (props: Props) => {
  return <Section>{props.children}</Section>;
};
