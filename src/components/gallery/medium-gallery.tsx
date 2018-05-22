import * as React from "react";
import { debounce } from "lodash";

import "./style.css";

import { IMediumPost } from "../../types/index";
import { PageProps, withPagination } from "../paginated";
import { GalleryItem } from "../gallery-item/index";
import { calcColumnUnit } from "../../utils/index";
import { InstaImage } from "../insta-post/index";
import { LoadingDots } from "../loading-dots/index";
import { MediumPost } from "../medium-post/index";

interface IProps extends PageProps<IMediumPost> {
  title: string;
  className?: string;
  color: string;
  onLoadMore: () => void;
}

interface IState {
  numberOfColumns: number;
  isMobile: boolean;
  hasPendingTransitions: boolean;
}

class MediumGalleryComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      numberOfColumns: 5,
      isMobile: false,
      hasPendingTransitions: false
    };

    this.onResize = debounce(this.onResize, 500);
  }

  componentDidMount() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    if (typeof document !== "undefined") {
      window.removeEventListener("resize", this.onResize);
    }
  }

  onResize = () => {
    this.setState({
      numberOfColumns: window.innerWidth <= 1024 ? 3 : 5,
      isMobile: window.innerWidth < 768
    });
  };

  render() {
    const { data, title, className = "", hasNext, color, loading } = this.props;
    const { numberOfColumns, isMobile } = this.state;

    return (
      <section className={`gallery`}>
        <h2 className={"gallery-title"}>{title}</h2>

        <div className={`grid ${className}`}>
          {data.map(item => (
            <MediumPost
              key={`medium-${item.id}`}
              data={item}
              isMobile={isMobile}
            />
          ))}
        </div>

        <div
          className={`load-more ${hasNext ? "" : "disabled"}`}
          style={{
            width: `calc(${
              isMobile
                ? "100vw"
                : numberOfColumns >= 5
                  ? `8 * ${calcColumnUnit(numberOfColumns)}`
                  : `4 * ${calcColumnUnit(numberOfColumns)}`
            })`,
            color
          }}
        >
          <span
            style={{
              visibility: hasNext ? "initial" : "hidden"
            }}
            onClick={
              hasNext
                ? () => {
                    this.props.loadNext();
                    this.props.onLoadMore();
                  }
                : () => null
            }
          >
            <span>{loading ? <LoadingDots /> : "MORE"}</span>
          </span>
        </div>
      </section>
    );
  }
}

export const MediumGallery = withPagination(MediumGalleryComponent);
