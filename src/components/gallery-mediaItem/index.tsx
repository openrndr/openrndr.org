import * as React from "react";

import { MediaItem } from "../../types";
import { BackgroundImage } from "../background-image/BackgroundImage";
import { BackgroundGif } from "../background-gif/index";
import { Video } from "../video/index";

interface IProps {
  thumbnail: MediaItem;
  className?: string;
}

import "./style.css";

export const GalleryMediaItem: React.SFC<IProps> = ({ thumbnail }) => {
  return (
    <div className={"media-item"}>
      {(function() {
        switch (thumbnail.itemType) {
          case "image":
            return <BackgroundImage data={thumbnail} />;
          case "gif":
            return <BackgroundGif data={thumbnail} />;
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
  );
};
