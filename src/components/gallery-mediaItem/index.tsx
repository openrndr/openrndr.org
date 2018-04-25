import * as React from "react";

import { MediaItem } from "../../types";
import { BackgroundImage } from "../background-image/BackgroundImage";
import { BackgroundGif } from "../background-gif/index";
import { Video } from "../video/index";

interface Props {
  thumbnail: MediaItem;
  className?: string;
}

export const GalleryMediaItem: React.SFC<Props> = ({ thumbnail }) => {
  return (
    <div>
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
