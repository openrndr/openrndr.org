import React from "react";
import styled from "styled-components";
import Config from "../config";
import { Link } from "react-static";

const Container = styled.nav`
  padding-top: 20px;
`;

const MenuLink = styled(Link)`
  color: black;
  font-weight: normal;
  text-transform: uppercase;
  &.active {
    font-weight: bold;
  }
`;

interface Props {
  selection: string;
}

export const Menu = (props: Props) => {
  return (
    <Container>
      {Config.sections.map((object, i) => (
        <div key={i}>
          <MenuLink
            to={object.path}
            className={props.selection === object.title ? "active" : ""}
          >
            {object.title}
          </MenuLink>
        </div>
      ))}
    </Container>
  );
};
