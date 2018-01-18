import React, { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode[];
  className?: string;
}

const Section = styled.section`
  background: blue;
  display: grid;
  grid-template-areas:
    "header"
    "body";
`;

export default (props: Props) => {
  const {children, className} = props;
  return (
      <Section className={className}>
        {children}
      </Section>
  );
};
