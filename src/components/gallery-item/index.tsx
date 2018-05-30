import * as React from "react";
import { Fade, Slide } from "react-reveal";

import "./style.css";
import { Project as ProjectData } from "../../types";
import { GalleryMediaItem } from "../gallery-mediaItem/index";
import { TruncateText } from "../truncate-text/index";

interface IProps {
  data: ProjectData;
  style?: React.CSSProperties;
  open: boolean;
  isMobile: boolean;
  showMoreHandler?: () => void;
  showLightBoxHandler: () => void;
}

interface IState {
  isTextTruncate: boolean;
}

export class GalleryItem extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isTextTruncate: true
    };
  }

  toggleTextTruncate = () => {
    this.setState({
      isTextTruncate: !this.state.isTextTruncate
    });
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
                <h3
                  className={"item-title button"}
                  onClick={this.toggleTextTruncate}
                >
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
                  <TruncateText active={isTextTruncate} text={blurb} />
                </div>
              )}
            {((blurb && blurb.length > 0) ||
              (credits && credits.length > 0)) && (
              <span
                className={"read-more button"}
                onClick={this.toggleTextTruncate}
              >
                {isTextTruncate ? "READ MORE" : "READ LESS"}
              </span>
            )}
          </div>
        </div>
      </Fade>
    );
  }
}
