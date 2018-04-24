import React from "react";
import { siteConfig } from "./config";
import styled from "./theme";

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

export const Layout: React.SFC<any> = props => {
  return (
    <Container>
      {props.children}
      <BackgroundGrid>
        {siteConfig.sections
          .splice(0, 4)
          .map(({ metadata: { color } }) => (
            <div style={{ borderRight: `1px solid ${color}` }} />
          ))}
      </BackgroundGrid>
    </Container>
  );
};
