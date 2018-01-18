import React, { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
  className?: string;
  link?: string;
  linkTitle?: string;
}

const SectionHeader = styled.div`
  width: 100%;
  background: red;
  text-transform: uppercase;

  .header {
    grid-area: header;
  }
`;

export default (props: Props) => {
  const { className } = props;
  return (
    <SectionHeader className={className}>
      <div>{props.children}</div>
      {props.link != undefined && (
        <div>
          <a target="_blank" href={props.link}>
            {props.linkTitle}
          </a>
        </div>
      )}
    </SectionHeader>
  );
};
