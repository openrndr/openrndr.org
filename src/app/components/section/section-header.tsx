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

const Container = styled.div`
  width: 100%;
  text-transform: uppercase;

  .header {
    grid-area: header;
  }

  border-top: 1px solid;
  border-bottom: 1px solid;
  padding: 10px 20px;
`;

export const SectionHeader = (props: Props) => {
  const { className, sectionName } = props;

  return (
    <Container
      className={className}
      style={{
        borderColor: sectionName ? configs.borderColors[sectionName] : "none"
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
    </Container>
  );
};
