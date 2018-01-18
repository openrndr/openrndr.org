import React from "react";
import styled from "styled-components";
import Menu from "./menu";

const Container = styled.div`
  background: white;
  display: flex;
  div {
    background: blue;
    flex: 1;
    padding-top: 100px;
    text-align: left;
  }
`;

interface Props {}

export default (props: Props) => {
  return (
    <Container>
      <div>OPENRNDR</div>
      <div>Contact</div>
      <div>Support</div>
      <div>Social</div>
      <div>RNDR Studio</div>
    </Container>
  );
};
