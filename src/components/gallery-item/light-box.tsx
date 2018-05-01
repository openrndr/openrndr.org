import * as React from "react";
import Carousel from "nuka-carousel";

import { MediaItem, Project as ProjectData } from "../../types";
import { Video } from "../video";
import { Image } from "../image";

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
          <Video data={data} controls={false} width={`100%`} height={`100%`} />
        );
    }
  })();
  return <div className="media-item-container">{item}</div>;
};

interface ILightBoxProps {
  data: ProjectData;
  onClose: (e: any) => void;
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
      default:
        break;
    }
  };

  goNext = () => {
    const next = this.state.slideIndex + 1;
    if (next > this.props.data.media.length) {
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
      e.target.classList.contains("carousel-close-btn")
    ) {
      this.props.onClose(e);
    }
  };

  render() {
    const { data } = this.props;

    return (
      <div className="gallery-lightbox" onClick={this.onClose}>
        <div className={"carousel-close-btn control"}>X</div>
        <div className="carousel-container">
          <Carousel
            slideIndex={this.state.slideIndex}
            afterSlide={(slideIndex: number) => this.setState({ slideIndex })}
            renderCenterLeftControls={({
              previousSlide
            }: ButtonControlProps) => (
              <div className="control" onClick={previousSlide}>
                {"<"}
              </div>
            )}
            renderCenterRightControls={({ nextSlide }: ButtonControlProps) => (
              <div className="control" onClick={nextSlide}>
                {">"}
              </div>
            )}
          >
            {data.media.map(m => <Media key={m.id} data={m} />)}
          </Carousel>
        </div>
      </div>
    );
  }
}
