import * as React from "react";
import { Carousel } from "react-responsive-carousel";

import { Project as ProjectType, MediaItem } from "../../../types/index";
import { ProjectMedia } from "../project/project-media";
import styled from "styled-components";

interface Props {
  data: ProjectType;
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
}

const SlideItem = styled.div`
  background: black;
`;

const Wrapper = styled.div`
  display: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  z-index: 999999999999;
  top: 0;
  left: 0;
`;

export const SlideShow: React.StatelessComponent<Props> = ({
  data: { media },
  onClose
}: Props) => (
  <Wrapper>
    <Carousel
      showThumbs={false}
      showStatus={false}
      useKeyboardArrows
      emulateTouch
      selectedItem={0}
      className="presentation-mode"
    >
      {media.map((mediaItem, i) => (
        <SlideItem key={`slide-${i}`}>
          <ProjectMedia thumbnail={mediaItem} />
        </SlideItem>
      ))}
    </Carousel>
    <div onClick={onClose}>CLOSE</div>
  </Wrapper>
);
