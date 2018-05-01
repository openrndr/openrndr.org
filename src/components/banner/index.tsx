import * as React from "react";

import "./style.css";
import { Project as ProjectType } from "../../types/index";
import { GalleryMediaItem } from "../gallery-mediaItem/index";

interface IProps {
  data: ProjectType;
}

export const Banner: React.SFC<IProps> = ({ data }) => {
  return (
    <section className={"banner"}>
      <GalleryMediaItem thumbnail={data.media[0]} autoPlay={true} />
    </section>
  );
};
