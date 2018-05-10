import * as React from "react";
import Carousel from "nuka-carousel";
import { Fade, Slide } from "react-reveal";

import { MediaItem, Project as ProjectData } from "../../types";
import { Video } from "../video";
import { Image } from "../image/index";
import Imgix from "react-imgix";

interface ButtonControlProps {
  [key: string]: () => any;

  previouseSlide: () => any;
  nextSlide: () => any;
}

import "./style.css";
import { string } from "prop-types";

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
            height={`100%`}
            playing={true}
          />
        );
    }
  })();
  return <div className="media-item-container">{item}</div>;
};

const Thumbnail: React.SFC<{ data: MediaItem }> = props => {
  const { data } = props;
  const src = (function() {
    switch (data.itemType) {
      case "image":
        return data.file.url;
      case "gif":
        return data.url;
      case "video":
        return data.file.thumbnailUrl;
    }
  })();
  return (
    <Imgix
      type="bg"
      fit={"crop"}
      className={"light-box-thumb-container"}
      imgProps={{
        style: {
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }
      }}
      src={src}
    />
  );
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
      <div className={`light-box`} onClick={this.onClose}>
        <div className={"carousel-close-btn control"} />
        <div className={`light-box-content`}>
          <div className="carousel-container">
            <Carousel
              slideIndex={this.state.slideIndex}
              afterSlide={(slideIndex: number) => this.setState({ slideIndex })}
              renderCenterLeftControls={({
                previousSlide
              }: ButtonControlProps) =>
                this.state.slideIndex - 1 === -1 || isMobile ? null : (
                  <div className="control" onClick={previousSlide} />
                )
              }
              renderCenterRightControls={({ nextSlide }: ButtonControlProps) =>
                this.state.slideIndex + 1 === data.media.length ||
                isMobile ? null : (
                  <div className="control" onClick={nextSlide} />
                )
              }
              renderBottomLeftControls={({
                previousSlide
              }: ButtonControlProps) =>
                this.state.slideIndex - 1 === -1 || !isMobile ? null : (
                  <div className="control" onClick={previousSlide} />
                )
              }
              renderBottomRightControls={({ nextSlide }: ButtonControlProps) =>
                this.state.slideIndex + 1 === data.media.length ||
                !isMobile ? null : (
                  <div className="control" onClick={nextSlide} />
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
                  <Media key={m.id} data={m} />
                  <div className={"media-item-caption"}>
                    <div dangerouslySetInnerHTML={{ __html: m.caption }} />
                    {m.credits && (
                      <div
                        className={"media-item-credit"}
                        dangerouslySetInnerHTML={{ __html: m.credits }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
          <div className={"light-box-thumbnails-wrapper"}>
            <div className={"light-box-thumbnails-container"}>
              {data.media.map((media, i) => (
                <div
                  className={`light-box-thumbnail ${
                    i === this.state.slideIndex ? "highlighted" : ""
                  }`}
                  onClick={() => {
                    this.setState({ slideIndex: i });
                  }}
                  key={`thumb-${media.id}`}
                >
                  <Thumbnail data={media} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
