import React, {ReactNode} from "react";
import styled from "styled-components";

interface Props{
  children: ReactNode;
  className?: string;
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
  const {className} = props;
  return(
      <SectionHeader className={className}>
        {props.children}
      </SectionHeader>
  );
};
