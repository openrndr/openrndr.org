import * as React from "react";
import { Fade, Slide } from "react-reveal";

import { IMediumPost } from "../../types";

interface IProps {
  data: IMediumPost;
  style?: React.CSSProperties;
  isMobile: boolean;
}

export class MediumPost extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { data, style = {} } = this.props;

    return (
      <Fade clear>
        <div className={"gallery-item"}>
          {data.imageUrl && (
            <a href={data.link} target={"_blank"}>
              <img width="100%" src={data.imageUrl} />
            </a>
          )}

          <div className={`item-info show-all`}>
            <div className={"project-metadata"}>
              <h3>{data.title}</h3>
            </div>

            <div className={"blurb"}>
              <article
                dangerouslySetInnerHTML={{
                  __html: data.blurb
                }}
              />
              <a className={"read-more"} href={data.link} target={"_blank"}>
                READ MORE
              </a>
            </div>
          </div>
        </div>
      </Fade>
    );
  }
}
