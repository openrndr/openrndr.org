import React from "react";
import { Image } from "src/types";
import styled from "styled-components";

interface Props {
  image: Image;
}

const Container = styled.div`
  width: 500px;
  background: yellow;
`;

export default (props: Props) => {
  return (
    <div>
      <img src={props.image.file.url} />
      <div>{props.image.caption}</div>
    </div>
  );
};
