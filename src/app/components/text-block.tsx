import React from "react";
import styled from "styled-components";
import {TextBlock} from "../../types";
import {Link} from "react-router-dom";

const Container = styled.div`
  background: purple;
  padding:20px;
  h3 {
    text-transform: uppercase;
  }
`;

interface Props {
    data: TextBlock;
}

export default (props: Props) => {

    return (
        <Container>
          <h3>{props.data.title}</h3>
          <p dangerouslySetInnerHTML={{
            __html: props.data.bodyText
          }}/>
          {
            (props.data.link && props.data.link.length > 0) &&
            <Link to={props.data.link} target="_blank">
              <small>>></small>
            </Link>
          }
        </Container>
    );
};
