import * as React from "react";

import { Project as ProjectData } from "../../types";
import { GalleryMediaItem } from "../GalleryMediaItem/index";

interface Props {
  data: ProjectData;
  className?: string;
  onClick?(e: React.MouseEvent<HTMLElement>): void;
}

const noop = (e: React.MouseEvent<HTMLElement>) => {};

export const GalleryItem: React.SFC<Props> = ({
  className,
  onClick = noop
}) => {
  const { title, blurb, media } = props.data;
  const thumbnail = media[0];

  return (
    <div className={className} onClick={onClick}>
      <GalleryMediaItem thumbnail={thumbnail} />
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
    </div>
  );
};
