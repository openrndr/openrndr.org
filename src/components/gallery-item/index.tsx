import * as React from "react";

import { Project as ProjectData } from "../../types";
import { GalleryMediaItem } from "../gallery-mediaItem/index";

interface Props {
  data: ProjectData;
  onClick?(e: React.MouseEvent<HTMLElement>): void;
}

import "./style.css";

export const GalleryItem: React.SFC<Props> = ({ data, onClick = () => {} }) => {
  const { title, blurb, media } = data;
  const thumbnail = media[0];

  return (
    <div className={"gallery-item"} onClick={onClick}>
      <GalleryMediaItem thumbnail={thumbnail} />
      <div className={"item-info"}>
        {title && title.length > 0 && <h3 className={"title"}>{title}</h3>}
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
    </div>
  );
};
