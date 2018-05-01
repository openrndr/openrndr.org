import * as React from "react";

import "./style.css";
import { Project as ProjectData } from "../../types";
import { GalleryMediaItem } from "../gallery-mediaItem/index";
import { LightBox } from "./light-box";

interface IProps {
  data: ProjectData;
  style: React.CSSProperties;
  open: boolean;
}

interface IState {
  showLightBox: boolean;
}

export class GalleryItem extends React.Component<IProps, IState> {
  state = {
    showLightBox: this.props.open
  };

  showLightBox = () => {
    if (typeof document !== "undefined") {
      if (window.innerWidth <= 760) {
        return;
      }
    }

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
      <div style={style} className={"gallery-item"}>
        {showLightBox && <LightBox data={data} onClose={this.hideLightBox} />}
        <GalleryMediaItem onClick={this.showLightBox} thumbnail={thumbnail} />
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
