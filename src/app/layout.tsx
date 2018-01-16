import React, { StatelessComponent } from "react";
import styled from "styled-components";

const Container = styled.div`
  background: rgb(200, 200, 255);
`;

const Layout: StatelessComponent = props => {
  return <Container>{props.children}</Container>;
};

export default Layout;
