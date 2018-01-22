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
  name?: string;
  id: string;
}

const Section = styled.section`
  display: grid;
  grid-template-areas:
    "header"
    "body";
`;

export default (props: Props) => {
  const { id, children, name } = props;

  const childrenWithProps = React.Children.map(children, child => {
    return React.cloneElement(child as ReactElement<any>, {
      sectionName: name
    });
  });

  return (
    <Element id={id} name={name}>
      {childrenWithProps}
    </Element>
  );
};
