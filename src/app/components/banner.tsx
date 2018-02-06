import React, { ReactNode } from "react";
import styled from "styled-components";

import { Project } from "../../types/";

import { BgGif } from "./background-gif";
import { Video } from "./video";
import { BgImage } from "./background-image";

export interface Props {
  data: Project;
}

const Wrapper = styled.div`
  overflow: hidden;
`;

export const Banner = (props: Props) => {
  const { media } = props.data;
  const thumbnail = media[0];

  return (
    <Wrapper>
      {(function() {
        switch (thumbnail.itemType) {
          case "image":
            return <BgImage data={thumbnail} />;
          case "gif":
            return <BgGif data={thumbnail} />;
          case "video":
            return (
              <Video
                data={thumbnail}
                controls={false}
                autoPlay={true}
                playing={true}
                width={`100%`}
                height={`80vh`}
              />
            );
        }
      })()}
    </Wrapper>
  );
};
