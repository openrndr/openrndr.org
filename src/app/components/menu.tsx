import React from "react";
import styled from "styled-components";
import { siteConfig } from "../config";
import { Link } from "react-static";

const Container = styled.nav`
  padding: 20px;
`;

const MenuLink = styled(Link)`
  color: black;
  font-weight: normal;
  text-transform: uppercase;

  > h3 {
    font-weight: 100;
  }
  &.active > h3 {
    font-weight: 800;
  }
`;

interface Props {
  selection: string;
}

export const Menu = (props: Props) => {
  return (
    <Container>
      {siteConfig.sections.map(({ metadata }, i) => (
        <div key={i}>
          <MenuLink
            to={metadata.path}
            className={
              props.selection.toLowerCase() === metadata.path.toLowerCase()
                ? "active"
                : ""
            }
          >
            <h3>{metadata.title}</h3>
          </MenuLink>
        </div>
      ))}
    </Container>
  );
};
