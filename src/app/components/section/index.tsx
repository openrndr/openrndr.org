import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from "react-scroll";

interface Props {
  children: ReactNode[];
  activeSectionName?: string;
  config?: any;
}

const Container = styled.section`
  display: grid;
  grid-template-areas:
    "header"
    "body";
`;

export const Section = (props: Props) => {
  const { children, config, activeSectionName } = props;

  const childrenWithProps = React.Children.map(children, child => {
    return React.cloneElement(child as ReactElement<any>, {
      config,
      activeSectionName
    });
  });

  return <Container>{childrenWithProps}</Container>;
};
