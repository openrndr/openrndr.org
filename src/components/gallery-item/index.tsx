import * as React from "react";

import "./style.css";
import { Project as ProjectData } from "../../types";
import { GalleryMediaItem } from "../gallery-mediaItem/index";
import { LightBox } from "./light-box";

interface IProps {
  data: ProjectData;
  style?: React.CSSProperties;
  open: boolean;
  isMobile: boolean;
}

interface IState {
  showLightBox: boolean;
  isTextTruncate: boolean;
}

export class GalleryItem extends React.Component<IProps, IState> {
  state = {
    showLightBox: this.props.open,
    isTextTruncate: true
  };

  showLightBox = () => {
    if (typeof document !== "undefined") {
      // if (window.innerWidth <= 760) {
      //   return;
      // }
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

  toggleTextTruncate = () => {
    this.setState({
      isTextTruncate: !this.state.isTextTruncate
    });
  };

  calcVisibleLength = () => {
    if (typeof document !== "undefined") {
      const charsPerLine = window.innerWidth / 43.46378906;
      const lines = 5;
      return ~~charsPerLine * lines;
    }
  };

  render() {
    const { data, style = {}, isMobile } = this.props;
    const { showLightBox, isTextTruncate } = this.state;
    const { title, blurb, media } = data;
    const thumbnail = media[0];

    return (
      <div style={style} className={"gallery-item"}>
        {showLightBox && (
          <LightBox
            data={data}
            onClose={this.hideLightBox}
            isMobile={isMobile}
          />
        )}
        <GalleryMediaItem onClick={this.showLightBox} thumbnail={thumbnail} />
        <div className={"item-info"}>
          {title && title.length > 0 && <h3 className={"title"}>{title}</h3>}
          {blurb &&
            blurb.length > 0 && (
              <div className={"blurb"}>
                <article
                  dangerouslySetInnerHTML={{
                    __html: `${
                      isTextTruncate
                        ? `${blurb.slice(0, this.calcVisibleLength())}...`
                        : blurb
                    }`
                  }}
                />
                <span className={"read-more"} onClick={this.toggleTextTruncate}>
                  {isTextTruncate ? "READ MORE" : "READ LESS"}
                </span>
              </div>
            )}
        </div>
      </div>
    );
  }
}
