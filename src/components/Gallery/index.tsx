import * as React from "react";

import "./style.css";
import { Project as ProjectType } from "../../types/index";
import { withPagination } from "../paginated";
import { GalleryItem } from "../GalleryItem/index";

interface IProps {
  title: string;
  loading: boolean;
  data: ProjectType[];
  loadNext: () => any;
  hasNext: boolean;
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
    <section className={`gallery ${className}`}>
      <h3>{title}</h3>

      <div className={"grid"}>
        {data.map(item => <GalleryItem data={item} />)}
      </div>

      <div className={"load-more"}>
        <span className={"gap"} />
        <span onClick={hasNext ? loadNext : () => {}}>
          {hasNext ? "MORE" : "No more pages to load"}
        </span>
      </div>
    </section>
  );
};

export const Gallery = withPagination(GalleryComponent);
