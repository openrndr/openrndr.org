import * as React from "react";
import Carousel from "nuka-carousel";
import { Fade, Slide } from "react-reveal";
import { debounce } from "lodash";

import { IDatoVideoFile, MediaItem, Project as ProjectData } from "../../types";
import { Video } from "../video";
import { Image } from "../image/index";
import Imgix from "react-imgix";

interface ButtonControlProps {
  [key: string]: () => any;
  previousSlide: () => any;
  nextSlide: () => any;
}

import "./style.css";
import { string } from "prop-types";

interface IMediaStyle {
  width: string;
  height: string;
  maxHeight?: string;
}

const MediaVideo: React.SFC<{ file: IDatoVideoFile; style: IMediaStyle }> = ({
  file,
  style
}) => (
  <Video
    data={file}
    controls={true}
    width={style.width}
    height={style.height}
    style={{
      maxHeight: style.maxHeight
    }}
    playing={false}
  />
);

const Media: React.SFC<{
  data: MediaItem;
  windowRatio: number;
  isMobile: boolean;
}> = props => {
  const { data, windowRatio, isMobile } = props;

  const file = data.itemType === "gif" && data.video ? data.video : data.file;
  let style: IMediaStyle = { width: "100%", height: "100%", maxHeight: "" };

  if (file) {
    const ratio = file.width / file.height;
    const width = isMobile ? "100vw" : `calc(calc(100vw - 40px) * 0.8)`;
    const maxHeight = isMobile
      ? `calc(100vw * 0.85)`
      : `calc(calc(calc(100vh - 40px) * 0.8) * 0.85)`;

    style = {
      width,
      height: `calc(${width} / ${ratio})`,
      maxHeight
    };

    if (windowRatio >= ratio) {
      style = {
        height: maxHeight,
        width: `calc(${maxHeight} * ${ratio})`
      };
    }
  }

  const item = (function() {
    switch (data.itemType) {
      case "image":
        return <Image data={data} style={style} />;
      case "gif":
        if (data.video) {
          return <MediaVideo file={data.video} style={style} />;
        }

        if (data.file) {
          return <img src={data.file.url} />;
        }

        return <img src={data.url} />;
      case "video":
        return <MediaVideo file={data.file} style={style} />;
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
        return data.file.url;
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
  windowRatio: number;
  loaded: boolean;
  isMobile: boolean;
}

export class LightBox extends React.Component<ILightBoxProps, ILightBoxState> {
  constructor(props: ILightBoxProps) {
    super(props);
    this.state = {
      slideIndex: 0,
      windowRatio: -1,
      loaded: false,
      isMobile: false
    };

    this.onResize = debounce(this.onResize, 100);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("resize", this.onResize);
    this.onResize();
    this.setState({ loaded: true });
  }

  componentWillUnmount() {
    if (typeof document !== "undefined") {
      document.removeEventListener("keydown", this.onKeyDown);
      window.removeEventListener("resize", this.onResize);
    }
  }

  onResize = () => {
    this.setState({
      windowRatio: window.innerWidth / window.innerHeight,
      isMobile: window.innerWidth <= 600
    });
  };

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
      e.target.classList.contains("light-box-thumbnails-wrapper") ||
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
      ? currentMedia.file.width
        ? currentMedia.file.width > currentMedia.file.height
          ? "horizontal"
          : "vertical"
        : "horizontal"
      : "horizontal";

    if (this.state.windowRatio === -1) {
      return null;
    }

    return (
      <div
        className={`light-box ${this.state.loaded ? "loaded" : ""}`}
        onClick={this.onClose}
      >
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
              dragging={false}
              swiping={isMobile}
              onClick={this.onClose}
            >
              {data.media.map(m => (
                <div
                  className={`slide-wrapper ${orientation} ${
                    currentMedia.itemType
                  }`}
                  key={`slide-${m.id}`}
                  onClick={this.onClose}
                >
                  <Media
                    key={m.id}
                    data={m}
                    windowRatio={this.state.windowRatio}
                    isMobile={isMobile}
                  />
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
