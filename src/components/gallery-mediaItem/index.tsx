import * as React from "react";

import { MediaItem } from "../../types";
import { BackgroundImage } from "../background-image/BackgroundImage";
import { BackgroundGif } from "../background-gif/index";
import { Video } from "../video/index";

interface IProps {
  thumbnail: MediaItem;
  className?: string;
  autoPlay?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

import "./style.css";
import { ImageX } from "../image-x/index";

export const GalleryMediaItem: React.SFC<IProps> = ({
  thumbnail,
  autoPlay = false,
  onClick = () => {}
}) => {
  return (
    <div className={"media-item"} onClick={onClick}>
      {(function() {
        switch (thumbnail.itemType) {
          case "image":
            return <ImageX data={thumbnail} fit={"fillmax"} />;
          case "gif":
            return <BackgroundGif data={thumbnail} />;
          case "video":
            return (
              <div
                style={{
                  background: `url(${thumbnail.file.thumbnailUrl})`,
                  width: `100%`,
                  height: `100%`,
                  backgroundPosition: "center",
                  backgroundSize: "fill"
                }}
              />
            );
        }
      })()}
    </div>
  );
};
