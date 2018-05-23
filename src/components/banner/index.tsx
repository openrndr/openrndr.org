import * as React from "react";

import "./style.css";
import { MediaItem, Project as ProjectType } from "../../types/index";
import { ImageX } from "../image-x/index";
import { BackgroundGif } from "../background-gif/index";
import { Video } from "../video/index";
import { calcBannerSize } from "../../utils/index";
import { LoadingDots } from "../loading-dots/index";

interface IProps {
  data: ProjectType;
  onMount: (height: number) => void;
}

interface IState {
  windowWidth: number;
  loaded: boolean;
}

export class Banner extends React.Component<IProps, IState> {
  state = {
    windowWidth: 0,
    loaded: false
  };

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
    const { height } = calcBannerSize(
      this.props.data.media[0],
      window.innerWidth
    );
    this.props.onMount(height);
  }

  componentWillUnmount() {
    if (typeof document !== "undefined") {
      window.removeEventListener("resize", this.onResize);
    }
  }

  onResize = () => {
    this.setState({
      windowWidth: window.innerWidth
    });
  };

  onLoad = () => {
    this.setState({
      loaded: true
    });
  };

  render() {
    const thumbnail = this.props.data.media[0];
    const { windowWidth, loaded } = this.state;
    const { width, height } = calcBannerSize(thumbnail, windowWidth);
    const onLoad = this.onLoad;

    //we do not have onload handler for background gifs :(
    const isGif = thumbnail.itemType === "gif";

    return (
      <section
        className={"banner"}
        style={{
          width,
          height
        }}
      >
        {(function() {
          switch (thumbnail.itemType) {
            case "image":
              return <ImageX data={thumbnail} fit={"fill"} onLoad={onLoad} />;
            case "gif":
              return <BackgroundGif data={thumbnail} />;
            case "video":
              return (
                <Video
                  data={thumbnail.file}
                  width={width ? width : "100%"}
                  height={height ? height : "100%"}
                  playing={true}
                  controls={false}
                  loop={true}
                  onReady={onLoad}
                  style={{
                    opacity: isGif ? 1 : loaded && width ? 1 : 0
                  }}
                />
              );
          }
        })()}
      </section>
    );
  }
}
