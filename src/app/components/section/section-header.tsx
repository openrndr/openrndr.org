import React from "react";
import styled from "styled-components";

const SectionHeader = styled.div`
  width: 100%;
  background: red;
  text-transform: uppercase;

  .header {
    grid-area: header;
  }
`;

export default (props: any) => {
  return <SectionHeader>{props.children}</SectionHeader>;
};
