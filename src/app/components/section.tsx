import React from "react";
import styled from "styled-components";
import Menu from './menu';

const Container = styled.div`
background: lightgrey;
`

interface Props {
	title: string;
}

export default (props: Props) => {
  return (
    <Container>
      <h1>{props.title}</h1>
	  <Menu selection={props.title} />
    </Container>
  );
};