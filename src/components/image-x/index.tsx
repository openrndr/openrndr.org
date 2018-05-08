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
      file: { url }
    } = data;

    return (
      <div className={`image-wrapper ${this.state.isLoaded ? "loaded" : ""}`}>
        <img className={"load-icon"} src={"loading-black.gif"} />
        <Imgix
          src={url}
          fit={fit}
          crop={crop}
          imgProps={{
            onLoad: this.onLoad
          }}
          width={"100%"}
          height={"auto"}
        />
      </div>
    );
  }
}
