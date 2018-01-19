import React, { ReactNode } from "react";
import styled from "styled-components";
import configs from "../../../../data/site-configs";

interface Props {
  children: ReactNode;
  className?: string;
  sectionName?: string;
  link?: string;
  linkTitle?: string;
}

const SectionHeader = styled.div`
  width: 100%;
  text-transform: uppercase;

  .header {
    grid-area: header;
  }

  border-top: 1px solid;
  border-bottom: 1px solid;
`;

export default (props: Props) => {
  const { className, sectionName } = props;

  return (
    <SectionHeader
      className={className}
      style={{
        borderColor: configs.borderColors[sectionName]
      }}
    >
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
