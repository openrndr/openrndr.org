import * as React from "react";

import "./style.css";
import { MediaItem, Project as ProjectType } from "../../types/index";
import { ImageX } from "../image-x/index";
import { BackgroundGif } from "../background-gif/index";
import { Video } from "../video/index";
import { calcBannerSize } from "../../utils/index";

interface IProps {
  data: ProjectType;
  onMount: (height: number) => void;
}

interface IState {
  windowWidth: number;
}

export class Banner extends React.Component<IProps> {
  state = {
    windowWidth: 0
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

  render() {
    const thumbnail = this.props.data.media[0];
    const { windowWidth } = this.state;
    const { width, height } = calcBannerSize(thumbnail, windowWidth);

    return (
      <section className={"banner"}>
        {(function() {
          switch (thumbnail.itemType) {
            case "image":
              return <ImageX data={thumbnail} fit={"fill"} />;
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
                  style={{
                    opacity: width ? 1 : 0
                  }}
                />
              );
          }
        })()}
      </section>
    );
  }
}
