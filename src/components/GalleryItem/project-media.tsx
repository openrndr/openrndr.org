import React from "react";
import styled from "styled-components";

import { MediaItem } from "../../types";
import { BgImage } from "../background-image";
import { BgGif } from "../background-gif";
import { Video } from "../video";

interface Props {
  thumbnail: MediaItem;
  className?: string;
}

const Wrapper = styled.div`
  width: 100%;
`;

export const ProjectMedia = (props: Props) => {
  const { thumbnail } = props;

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
                width={`100%`}
                height={`100%`}
              />
            );
        }
      })()}
    </Wrapper>
  );
};
