import { Carousel } from "react-responsive-carousel";

import { Project as ProjectType } from "../../../types/index";
import { ProjectMedia } from "../project/project-media";
import styled from "styled-components";

interface Props {
  data: ProjectType;
}

const Slide = styled.div``;

export const SlideShow = (props: Props) => {
  const { media } = this.props.data;

  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      useKeyboardArrows
      emulateTouch
      selectedItem={selectedItem}
      className="presentation-mode"
    >
      {media.map((mediaItem, i) => (
        <Slide key={`slide-${i}`}>
          <ProjectMedia thumbnail={mediaItem} />
        </Slide>
      ))}
    </Carousel>
  );
};
