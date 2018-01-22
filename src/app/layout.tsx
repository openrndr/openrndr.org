import React, { StatelessComponent } from "react";
import styled from "styled-components";
import config from "../../data/site-configs";

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
`;

const Layout: StatelessComponent = props => {
  return (
    <Container>
      {props.children}
      <BackgroundGrid>
        {Object.keys(config.borderColors)
          .splice(0, 4)
          .map(key => (
            <div
              style={{
                borderRight: `1px solid ${config.borderColors[key]}`
              }}
            />
          ))}
      </BackgroundGrid>
    </Container>
  );
};

export default Layout;
