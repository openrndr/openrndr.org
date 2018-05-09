import * as React from "react";
import { Fade, Slide } from "react-reveal";

import "./style.css";
import { Project as ProjectData } from "../../types";
import { GalleryMediaItem } from "../gallery-mediaItem/index";
import { LightBox } from "./light-box";

interface IProps {
  data: ProjectData;
  style?: React.CSSProperties;
  open: boolean;
  isMobile: boolean;
  showMoreHandler?: () => void;
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
    const { title, blurb, media, credits, techSpecs } = data;
    const thumbnail = media[0];

    return (
      <Fade clear>
        <div
          className={"gallery-item"}
          style={{
            ...style,
            zIndex: showLightBox ? 99999 : 1
          }}
        >
          {showLightBox && (
            <LightBox
              data={data}
              onClose={this.hideLightBox}
              isMobile={isMobile}
            />
          )}
          <GalleryMediaItem onClick={this.showLightBox} thumbnail={thumbnail} />
          <div className={`item-info ${!isTextTruncate && "show-all"}`}>
            <div className={"project-metadata"}>
              {title &&
                title.length > 0 && (
                  <h3
                    className={"title metadata-group"}
                    onClick={this.toggleTextTruncate}
                  >
                    {title}
                  </h3>
                )}

              {!isTextTruncate && (
                <div className={"metadata-group"}>
                  {techSpecs &&
                    techSpecs.length > 0 && (
                      <div className={"techspec"}>
                        <span>TECH SPECS</span>
                        <span dangerouslySetInnerHTML={{ __html: techSpecs }} />
                      </div>
                    )}
                  {credits &&
                    credits.length > 0 && (
                      <div className={"credits"}>
                        <span>CREDITS</span>
                        <span dangerouslySetInnerHTML={{ __html: credits }} />
                      </div>
                    )}
                </div>
              )}
            </div>

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
                  <span
                    className={"read-more"}
                    onClick={this.toggleTextTruncate}
                  >
                    {isTextTruncate ? "READ MORE" : "READ LESS"}
                  </span>
                </div>
              )}
          </div>
        </div>
      </Fade>
    );
  }
}
