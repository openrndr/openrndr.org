import * as React from "react";
import Carousel from "nuka-carousel";

import { MediaItem, Project as ProjectData } from "../../types";
import { Video } from "../video";
import { Image } from "../image/index";

interface ButtonControlProps {
  [key: string]: () => any;
  previouseSlide: () => any;
  nextSlide: () => any;
}

const Media: React.SFC<{ data: MediaItem }> = props => {
  const { data } = props;
  const item = (function() {
    switch (data.itemType) {
      case "image":
        return <Image data={data} />;
      case "gif":
        return <img src={data.url} />;
      case "video":
        return (
          <Video
            data={data}
            controls={false}
            width={`100%`}
            height={`450px`}
            playing={true}
          />
        );
    }
  })();
  return <div className="media-item-container">{item}</div>;
};

interface ILightBoxProps {
  data: ProjectData;
  onClose: (e: any) => void;
  isMobile: boolean;
}

interface ILightBoxState {
  slideIndex: number;
}

export class LightBox extends React.Component<ILightBoxProps, ILightBoxState> {
  constructor(props: ILightBoxProps) {
    super(props);
    this.state = {
      slideIndex: 0
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown);
  }

  onKeyDown = (e: any) => {
    switch (e.keyCode) {
      case 37:
        this.goPrev();
        break;
      case 39:
        this.goNext();
        break;
      case 27:
        this.props.onClose(e);
        break;
      default:
        break;
    }
  };

  goNext = () => {
    const next = this.state.slideIndex + 1;
    if (next >= this.props.data.media.length) {
      return;
    }
    this.setState({
      slideIndex: next
    });
  };

  goPrev = () => {
    const prev = this.state.slideIndex - 1;
    if (prev <= -1) {
      return;
    }
    this.setState({
      slideIndex: prev
    });
  };

  onClose = (e: any) => {
    if (
      e.target.classList.contains("media-item-container") ||
      e.target.classList.contains("carousel-close-btn") ||
      e.target.classList.contains("slide-wrapper")
    ) {
      this.props.onClose(e);
    }
  };

  render() {
    const { data, isMobile } = this.props;
    const currentMedia = data.media[this.state.slideIndex];

    const orientation = currentMedia.file
      ? currentMedia.file.width > currentMedia.file.height
        ? "horizontal"
        : "vertical"
      : "horizontal";

    return (
      <div className={`gallery-lightbox`} onClick={this.onClose}>
        <div className={"carousel-close-btn control"}>X</div>
        <div className="carousel-container">
          <Carousel
            slideIndex={this.state.slideIndex}
            afterSlide={(slideIndex: number) => this.setState({ slideIndex })}
            renderCenterLeftControls={({ previousSlide }: ButtonControlProps) =>
              this.state.slideIndex - 1 === -1 || isMobile ? null : (
                <div className="control" onClick={previousSlide}>
                  {"<"}
                </div>
              )
            }
            renderCenterRightControls={({ nextSlide }: ButtonControlProps) =>
              this.state.slideIndex + 1 === data.media.length ||
              isMobile ? null : (
                <div className="control" onClick={nextSlide}>
                  {">"}
                </div>
              )
            }
            renderBottomLeftControls={({ previousSlide }: ButtonControlProps) =>
              this.state.slideIndex - 1 === -1 || !isMobile ? null : (
                <div className="control" onClick={previousSlide}>
                  {"<"}
                </div>
              )
            }
            renderBottomRightControls={({ nextSlide }: ButtonControlProps) =>
              this.state.slideIndex + 1 === data.media.length ||
              !isMobile ? null : (
                <div className="control" onClick={nextSlide}>
                  {">"}
                </div>
              )
            }
          >
            {data.media.map(m => (
              <div
                className={`slide-wrapper ${orientation} ${
                  currentMedia.itemType
                }`}
                key={`slide-${m.id}`}
              >
                <div className={"gap"} />
                <div className={"slide-column"}>
                  <div className={"slide-column-content"}>
                    <Media key={m.id} data={m} />
                    <figcaption>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: m.caption
                        }}
                      />
                    </figcaption>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    );
  }
}
