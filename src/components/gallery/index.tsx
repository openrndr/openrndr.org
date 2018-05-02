import * as React from "react";
import {
  CSSTransition,
  TransitionGroup,
  Transition
} from "react-transition-group";

import "./style.css";

import { Project as ProjectType } from "../../types/index";
import { PageProps, withPagination } from "../paginated";
import { GalleryItem } from "../gallery-item/index";
import { calcColumnLeftPosition } from "../../utils/index";

interface IProps extends PageProps<ProjectType> {
  title: string;
  className?: string;
  color: string;
  onLoadMore: () => void;
}

interface IState {
  numberOfColumns: number;
}

const defaultStyle = {
  transition: `opacity ${500}ms ease-in-out`,
  opacity: 0
};

interface TransitionStyles {
  [key: string]: React.CSSProperties;
}
const transitionStyles: TransitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 }
};

class GalleryComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      numberOfColumns: 5
    };
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
      numberOfColumns: window.innerWidth <= 1024 ? 3 : 5
    });
  };

  render() {
    const { data, title, className = "", hasNext, color } = this.props;
    const { numberOfColumns } = this.state;

    return (
      <section className={`gallery`}>
        <h3 className={"gallery-title"}>{title}</h3>

        <TransitionGroup className={`grid ${className}`}>
          {data.map((item, i) => {
            return (
              <Transition key={item.id} timeout={300}>
                {(state: "entering" | "entered" | "exited") => {
                  // item.media.length > 3 line is only for debugging, remove it when gallery is done
                  return (
                    <GalleryItem
                      style={{ ...defaultStyle, ...transitionStyles[state] }}
                      open={false}
                      data={item}
                    />
                  );
                }}
              </Transition>
            );
          })}
        </TransitionGroup>

        <div
          className={`load-more ${hasNext ? "" : "disabled"}`}
          style={{
            marginLeft: `calc(-1 * ${calcColumnLeftPosition(
              1,
              numberOfColumns
            )})`,
            paddingLeft: calcColumnLeftPosition(1, numberOfColumns),
            color
          }}
        >
          <span
            style={{ visibility: hasNext ? "initial" : "hidden" }}
            onClick={
              hasNext
                ? () => {
                    this.props.loadNext();
                    this.props.onLoadMore();
                  }
                : () => null
            }
          >
            More
          </span>
        </div>
      </section>
    );
  }
}

export const Gallery = withPagination(GalleryComponent);
