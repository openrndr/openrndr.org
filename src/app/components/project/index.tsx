import React, { ReactNode } from "react";
import styled from "styled-components";

import { Project } from "../../../types/";

import Image from "../image";
import Gif from "../gif";
import Video from "../video";

interface Props {
  data: Project;
}

const Wrapper = styled.section`
  background: blue;
  display: grid;
`;

const MediaWrapper = styled.div`
  background: black;
`;

const InfoWrapper = styled.article`
  background: pink;
`;

export default (props: Props) => {
  console.log("PROJECT PROPS", props);
  const { title, blurb, media } = props.data;
  const thumbnail = media[0];
  return (
    <Wrapper>
      <MediaWrapper>
        {(function() {
          switch (thumbnail.itemType) {
            case "image":
              return <Image data={thumbnail} />;
            case "gif":
              return <Gif data={thumbnail} />;
            case "video":
              return <Video data={thumbnail} />;
          }
        })()}
      </MediaWrapper>
      <InfoWrapper>
        {title && title.length > 0 && <strong>{title}</strong>}
        {blurb && blurb.length > 0 && <p>{blurb}</p>}
      </InfoWrapper>
    </Wrapper>
  );
};
