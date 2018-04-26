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
  constructor(props: IProps) {
    super(props);
    this.state = {
      hasLoadedMore: false
    };
  }

  onLoadMoreClick = () => {
    if (!this.state.hasLoadedMore) {
      this.setState({
        hasLoadedMore: true
      });
    }
    this.props.loadNext();
  };

  render() {
    const { data, title, className = "", hasNext, color } = this.props;

    const { hasLoadedMore } = this.state;

    return (
      <section className={`gallery ${hasLoadedMore ? "loaded-more" : ""}`}>
        <h3 className={"gallery-title"}>{title}</h3>

        <div className={`grid ${className}`}>
          {data.map(item => <GalleryItem data={item} />)}
        </div>

        <div
          className={"load-more"}
          style={{
            marginLeft: `calc(-1 * ${calcColumnLeftPosition(1)})`,
            paddingLeft: calcColumnLeftPosition(1),
            color
          }}
        >
          {hasNext && (
            <span onClick={hasNext ? this.onLoadMoreClick : () => {}}>
              More
            </span>
          )}
        </div>
      </section>
    );
  }
}

export const Gallery = withPagination(GalleryComponent);
