import React, { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
  link?: string;
  linkTitle?: string;
}

const LinkBannerContainer = styled.div`
  width: 100%;
  background: red;
  text-transform: uppercase;
  display: grid;
  grid-template-columns: 3fr 2fr;

  .header {
    grid-area: header;
  }

  .button {
    background: pink;
    text-align: center;
    a {
      padding-top: 35px;
      display: block;
    }
  }
`;

export default (props: Props) => {
  return (
    <LinkBannerContainer>
      <div>{props.children}</div>
      <div className={"button"}>
        <a href={props.link} target="_blank">
          {props.linkTitle}
        </a>
      </div>
    </LinkBannerContainer>
  );
};
