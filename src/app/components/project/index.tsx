import React, { ReactNode } from "react";
import styled from "styled-components";

import { Project as ProjectData } from "../../../types/";
import { BgImage } from "../background-image";
import { BgGif } from "../background-gif";
import { Video } from "../video";


interface Props {
  data: Project;
  className?: string;
}

const Wrapper = styled.div`
  overflow: hidden;
  display: grid;
  grid-template-rows: 3fr 1.5fr;

  &:nth-child(n + 3) {
    .blurb {
      display: none;
    }
  }

  .project-media {
    width: 100%;
  }

  .project-info {
    padding: 10px;
  }
`;

export const Project = (props: Props) => {
  const { className } = props;
  const { title, blurb, media } = props.data;
  const thumbnail = media[0];
  return (
    <Wrapper className={className}>
      <div className={"project-media"}>
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
      </div>
      <div className={"project-info"}>
        {title && title.length > 0 && <span className={"title"}>{title}</span>}
        {blurb &&
          blurb.length > 0 && (
            <p
              className={"blurb"}
              dangerouslySetInnerHTML={{
                __html: blurb
              }}
            />
          )}
      </div>
    </Wrapper>
  );
};
