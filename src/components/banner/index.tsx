import * as React from "react";

import "./style.css";
import { Project as ProjectType } from "../../types/index";
import { ImageX } from "../image-x/index";
import { BackgroundGif } from "../background-gif/index";
import { Video } from "../video/index";

interface IProps {
  data: ProjectType;
}

export const Banner: React.SFC<IProps> = ({ data }) => {
  const thumbnail = data.media[0];

  return (
    <section className={"banner"}>
      {(function() {
        switch (thumbnail.itemType) {
          case "image":
            return <ImageX data={thumbnail} fit={"fill"} />;
          case "gif":
            return <BackgroundGif data={thumbnail} />;
          case "video":
            return (
              <Video
                data={thumbnail}
                width={`100%`}
                height={`100%`}
                playing={true}
                controls={false}
              />
            );
        }
      })()}
    </section>
  );
};
