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
import { LoadingDots } from "../loading-dots/index";

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

    const orientation = width / height >= 1.5 ? "landscape" : "portrait";

    return (
      <div
        className={`image-wrapper ${orientation} ${
          this.state.isLoaded ? "loaded" : ""
        }`}
      >
        {!this.state.isLoaded && <LoadingDots />}

        <Imgix
          src={url}
          fit={fit}
          crop={crop}
          imgProps={{
            onLoad: this.onLoad
          }}
        />
      </div>
    );
  }
}
