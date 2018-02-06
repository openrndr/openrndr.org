import React, { StatelessComponent } from "react";
import styled from "styled-components";
import config from "./config";

const Container = styled.div``;

const scrollBarWidth = 15;

const BackgroundGrid = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100vw - ${scrollBarWidth}px);
  height: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  z-index: -1;
`;

export const Layout: StatelessComponent = props => {
  return (
    <Container>
      {props.children}
      <BackgroundGrid>
        {config.sections
          .splice(0, 4)
          .map(({ color }) => (
            <div style={{ borderRight: `1px solid ${color}` }} />
          ))}
      </BackgroundGrid>
    </Container>
  );
};
