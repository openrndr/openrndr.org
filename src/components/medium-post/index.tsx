import * as React from "react";
import { Fade, Slide } from "react-reveal";

import { IMediumPost } from "../../types";
import { TruncateText } from "../truncate-text/index";

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
        <div
          className={"gallery-item"}
          itemScope
          itemType="http://schema.org/Article"
        >
          <span
            style={{ display: "none" }}
            itemProp={"author"}
            itemType="http://schema.org/Organization"
          >
            <span itemProp={"name"}>openrndr</span>
          </span>
          <span style={{ display: "none" }} itemProp={"image"}>
            {data.imageUrl}
          </span>
          <span style={{ display: "none" }} itemProp={"datePublished"}>
            {data.pubDate}
          </span>
          <span style={{ display: "none" }} itemProp={"dateModified"}>
            {data.updatedAt}
          </span>
          <span
            style={{ display: "none" }}
            itemProp={"publisher"}
            itemType="http://schema.org/Organization"
          >
            <span itemProp={"name"}>{data.creator}</span>
          </span>

          <div className={"media-item"}>
            {data.imageUrl && (
              <a href={data.link} target={"_blank"}>
                <span itemProp={"thumbnailUrl"} style={{ display: "none" }}>
                  {data.imageUrl}
                </span>
                {/*<img width="100%" src={data.imageUrl} />*/}
                <div
                  style={{
                    background: `url(${data.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "100%",
                    display: "block"
                  }}
                />
              </a>
            )}
          </div>

          <div className={`item-info show-all`}>
            <a
              className={"project-metadata"}
              href={data.link}
              target={"_blank"}
            >
              <h3 className={"item-title"} itemProp={"name headline"}>
                {data.title}
              </h3>
            </a>

            <div className={"blurb"} itemProp={"description"}>
              <TruncateText active={true} text={data.blurb} />
              <a
                className={"read-more button"}
                href={data.link}
                target={"_blank"}
              >
                READ ON MEDIUM
              </a>
            </div>
          </div>
        </div>
      </Fade>
    );
  }
}
