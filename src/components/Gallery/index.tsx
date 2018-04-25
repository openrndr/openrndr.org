import * as React from "react";

import "./style.css";
import { Project as ProjectType } from "../../types/index";
import { PageProps, withPagination } from "../paginated";
import { GalleryItem } from "../gallery-item/index";

interface IProps extends PageProps<ProjectType> {
  title: string;
  className?: string;
}

const GalleryComponent: React.SFC<IProps> = ({
  data,
  title,
  className = "",
  hasNext,
  loadNext
}) => {
  return (
    <section className={`gallery`}>
      <h3>{title}</h3>

      <div className={`grid ${className}`}>
        {data.map(item => <GalleryItem data={item} />)}
      </div>

      <div className={"load-more"}>
        <span onClick={hasNext ? loadNext : () => {}}>
          {hasNext ? "MORE" : "No more pages to load"}
        </span>
      </div>
    </section>
  );
};

export const Gallery = withPagination(GalleryComponent);
