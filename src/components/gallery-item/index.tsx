import * as React from "react";
import { Fade, Slide } from "react-reveal";
import { debounce } from "lodash";

import "./style.css";
import { Project as ProjectData } from "../../types";
import { GalleryMediaItem } from "../gallery-mediaItem/index";

interface IProps {
  data: ProjectData;
  style?: React.CSSProperties;
  open: boolean;
  isMobile: boolean;
  showMoreHandler?: () => void;
  showLightBoxHandler: () => void;
}

interface IState {
  showLightBox: boolean;
  isTextTruncate: boolean;
  charsPerLine: number;
}

export class GalleryItem extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showLightBox: this.props.open,
      isTextTruncate: true,
      charsPerLine: 0
    };
    this.onResize = debounce(this.onResize, 500);
  }

  componentDidMount() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    if (typeof document !== "undefined") {
      window.removeEventListener("resize", this.onResize);
    }
  }

  onResize = () => {
    if (typeof document !== "undefined") {
      this.setState({
        charsPerLine: window.innerWidth / 43.46378906
      });
    }
  };

  toggleTextTruncate = () => {
    this.setState({
      isTextTruncate: !this.state.isTextTruncate
    });
  };

  calcVisibleLength = (defaultLength: number) => {
    if (typeof document !== "undefined") {
      const lines = window.innerWidth > 1400 ? 7 : 5;
      return ~~this.state.charsPerLine * lines;
    }
    return defaultLength;
  };

  render() {
    const { data, style = {}, showLightBoxHandler } = this.props;
    const { isTextTruncate } = this.state;
    const { title, blurb, media, credits, techSpecs } = data;
    const thumbnail = media[0];

    return (
      <Fade clear>
        <div className={"gallery-item"}>
          {thumbnail && (
            <GalleryMediaItem
              onClick={showLightBoxHandler}
              thumbnail={thumbnail}
            />
          )}
          <div className={`item-info ${!isTextTruncate && "show-all"}`}>
            {title &&
              title.length > 0 && (
                <h3 className={"item-title"} onClick={this.toggleTextTruncate}>
                  {title}
                </h3>
              )}

            <div className={"item-credits"}>
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
                <div className={"item-blurb"}>
                  <article
                    dangerouslySetInnerHTML={{
                      __html: `${
                        isTextTruncate
                          ? `${blurb.slice(
                              0,
                              this.calcVisibleLength(blurb.length)
                            )}...`
                          : blurb
                      }`
                    }}
                  />
                </div>
              )}

            {((blurb && blurb.length > 0) ||
              (credits && credits.length > 0)) && (
              <span className={"read-more"} onClick={this.toggleTextTruncate}>
                {isTextTruncate ? "READ MORE" : "READ LESS"}
              </span>
            )}
          </div>
        </div>
      </Fade>
    );
  }
}
