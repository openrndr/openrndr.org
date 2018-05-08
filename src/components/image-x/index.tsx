import React from "react";
import Imgix from "react-imgix";
import { Image as ImageType } from "../../types";

interface IProps {
  data: ImageType;
  fit?: string;
  crop?: string;
}

export interface IImageState {
  isLoaded: boolean;
}

import "./style.css";

export class ImageX extends React.Component<IProps, IImageState> {
  constructor(props: IProps) {
    super(props);
    this.state = { isLoaded: false };
  }

  onLoad = () => {
    this.setState({ isLoaded: true });
  };

  render() {
    const { data, fit = "clip", crop } = this.props;
    const {
      file: { url, width, height }
    } = data;

    const orientation = width >= height ? "landscape" : "portrait";

    return (
      <div
        className={`image-wrapper ${orientation} ${
          this.state.isLoaded ? "loaded" : ""
        }`}
      >
        <img className={"load-icon"} src={"loading-black.gif"} />
        <Imgix
          src={url}
          fit={fit}
          crop={crop}
          imgProps={{
            onLoad: this.onLoad
          }}
          width={"auto"}
          height={"100%"}
        />
      </div>
    );
  }
}
