import React from "react";
import styled from "styled-components";

const SectionBody = styled.div`
  width: 100%;
  background: blue;
  display: grid;
  grid-template-columns: 1fr 4fr
`;

const Left = styled.div`
  background: green;
`;

const Right = styled.div`
  background: orange;
`;

export default (props: any) => {
  return (
      <SectionBody>
        <Left>
          <div>Menu component</div>
        </Left>
        <Right>
          {props.children}
        </Right>
      </SectionBody>
  );
};
