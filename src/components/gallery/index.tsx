import * as React from "react";
import { debounce } from "lodash";

import "./style.css";

import { Project as ProjectType } from "../../types/index";
import { PageProps, withPagination } from "../paginated";
import { GalleryItem } from "../gallery-item/index";
import { calcColumnUnit } from "../../utils/index";
import { InstaImage } from "../insta-post/index";
import { LoadingDots } from "../loading-dots/index";
import { LightBox } from "../light-box/index";

interface IProps extends PageProps<ProjectType> {
  title: string;
  className?: string;
  color: string;
  onLoadMore: () => void;
}

interface IState {
  numberOfColumns: number;
  isMobile: boolean;
  hasPendingTransitions: boolean;
  lightBoxProject: ProjectType | null;
}

class GalleryComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      numberOfColumns: 5,
      isMobile: false,
      hasPendingTransitions: false,
      lightBoxProject: null
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
      isMobile: window.innerWidth < 600
    });
  };

  setLightBoxProject = (project: ProjectType) => {
    this.setState({
      lightBoxProject: project
    });
  };

  unsetLightBoxProject = () => {
    this.setState({
      lightBoxProject: null
    });
  };

  render() {
    const { data, title, className = "", hasNext, color, loading } = this.props;
    const { numberOfColumns, lightBoxProject, isMobile } = this.state;

    return (
      <section className={`gallery`}>
        {lightBoxProject && (
          <LightBox
            data={lightBoxProject}
            onClose={this.unsetLightBoxProject}
            isMobile={isMobile}
          />
        )}

        <h2 className={"gallery-title"}>{title}</h2>

        <div className={`grid ${className}`}>
          {data.map(item => {
            return item.itemType === "insta_post" ? (
              <InstaImage
                key={`gallery-item-${item.id}`}
                link={item.link ? item.link : ""}
              />
            ) : (
              <GalleryItem
                key={`gallery-item-${item.id}`}
                open={false}
                data={item}
                isMobile={this.state.isMobile}
                showLightBoxHandler={() => this.setLightBoxProject(item)}
              />
            );
          })}
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
            <span className={"button"}>
              {loading ? <LoadingDots /> : "MORE"}
            </span>
          </span>
        </div>
      </section>
    );
  }
}

export const Gallery = withPagination(GalleryComponent);
