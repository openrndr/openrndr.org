import React, { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
  link?: string;
  linkTitle?: string;
}

const LinkBannerContainer = styled.div`
  text-transform: uppercase;
  display: grid;
  grid-template-columns: 3fr 2fr;

  .button {
    display: grid;
    align-items: center;
    text-align: center;
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
