import React from "react";
import styled from "styled-components";
import Config from "../config";
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
      {Config.sections.map((object, i) => (
        <div key={i}>
          <MenuLink
            to={object.path}
            className={
              props.selection.toLowerCase() === object.path.toLowerCase()
                ? "active"
                : ""
            }
          >
            <h3>{object.title}</h3>
          </MenuLink>
        </div>
      ))}
    </Container>
  );
};
