import * as React from "react";

import { Project as ProjectData } from "../../types";
import { GalleryMediaItem } from "../gallery-mediaItem/index";

interface IProps {
  data: ProjectData;
  style: React.CSSProperties;
}

import "./style.css";

export const GalleryItem: React.SFC<IProps> = props => {
  const { data, style } = props;
  const { title, blurb, media } = data;
  const thumbnail = media[0];

  return (
    <div style={style} className={"gallery-item"}>
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
