import * as React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
  WithStore,
  CarouselInjectedProps
} from "pure-react-carousel";

import Carousel from "nuka-carousel";

import "./style.css";
import { Project as ProjectData, MediaItem } from "../../types";
import { GalleryMediaItem } from "../gallery-mediaItem/index";
import { Video } from "../video";
import { Image } from "../image";

interface IProps {
  data: ProjectData;
  style: React.CSSProperties;
  open: boolean;
}

interface IState {
  showLightBox: boolean;
}

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

const LightBox: React.SFC<{ data: ProjectData }> = props => {
  const { data } = props;
  console.log("lightbox props", props);
  return (
    <div className="gallery-lightbox">
      <div className="carousel-container">
        <Carousel
          renderCenterLeftControls={({ previousSlide }: ButtonControlProps) => (
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
};

export class GalleryItem extends React.Component<IProps, IState> {
  state = {
    showLightBox: this.props.open
  };

  showLightBox = () => {
    this.setState({
      showLightBox: true
    });
  };

  hideLightBox = () => {
    this.setState({
      showLightBox: false
    });
  };

  render() {
    const { data, style } = this.props;
    const { showLightBox } = this.state;
    const { title, blurb, media } = data;
    const thumbnail = media[0];

    return (
      <div style={style} className={"gallery-item"} onClick={this.showLightBox}>
        {showLightBox && <LightBox data={data} />}
        <GalleryMediaItem thumbnail={thumbnail} />
        <div className={"item-info"}>
          {title && title.length > 0 && <h3 className={"title"}>{title}</h3>}
          {blurb &&
            blurb.length > 0 && (
              <p
                className={"blurb"}
                dangerouslySetInnerHTML={{
                  __html: blurb
                }}
              />
            )}
        </div>
      </div>
    );
  }
}
