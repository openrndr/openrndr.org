import React from "react";
import styled from "styled-components";
import Config from "../config";

const Container = styled.nav`
  background: orange;
`;

interface Props {
  selection: string;
}

export default (props: Props) => {
  return (
    <Container>
      {Config.sections.map((object, i) => (
        <div key={i}>
          {props.selection === object.title ? (
            <div>
              <b>
                <u>{object.title}</u>
              </b>
            </div>
          ) : (
            <div>{object.title}</div>
          )}
        </div>
      ))}
    </Container>
  );
};
