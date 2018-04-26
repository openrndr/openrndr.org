import * as React from "react";

import "./style.css";

import { Project as ProjectType } from "../../types/index";
import { PageProps, withPagination } from "../paginated";
import { GalleryItem } from "../gallery-item/index";
import { calcColumnLeftPosition } from "../../utils/index";

interface IProps extends PageProps<ProjectType> {
  title: string;
  className?: string;
  color: string;
}

interface IState {
  hasLoadedMore: boolean;
}

class GalleryComponent extends React.Component<IProps, IState> {
  render() {
    const { data, title, className = "", hasNext, color } = this.props;
    return (
      <section className={`gallery`}>
        <h3 className={"gallery-title"}>{title}</h3>

        <div className={`grid ${className}`}>
          {data.map(item => <GalleryItem key={item.id} data={item} />)}
        </div>

        <div
          className={`load-more ${hasNext ? "" : "disabled"}`}
          style={{
            marginLeft: `calc(-1 * ${calcColumnLeftPosition(1)})`,
            paddingLeft: calcColumnLeftPosition(1),
            color
          }}
        >
          <span
            style={{ visibility: hasNext ? "initial" : "hidden" }}
            onClick={hasNext ? this.props.loadNext : () => null}
          >
            More
          </span>
        </div>
      </section>
    );
  }
}

export const Gallery = withPagination(GalleryComponent);
