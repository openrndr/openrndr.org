import React from "react";
import Imgix from "react-imgix";
import { Image as ImageType } from "../../types";

interface IProps {
  data: ImageType;
  fit?: string;
  crop?: string;
  onLoad?: () => void;
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
    const { data, fit = "max", crop, onLoad = () => {} } = this.props;
    const {
      file: { url, width, height }
    } = data;

    const orientation = width / height >= 1.2 ? "landscape" : "portrait";
    const isNarrow = width / height >= 1.5;
    return (
      <div
        className={`image-wrapper ${orientation} ${
          this.state.isLoaded ? "loaded" : ""
        } ${isNarrow ? "narrow" : ""}`}
      >
        {!this.state.isLoaded && <LoadingDots />}

        <Imgix
          src={url}
          fit={fit}
          crop={crop}
          imgProps={{
            onLoad: () => {
              this.onLoad();
              onLoad();
            }
          }}
        />
      </div>
    );
  }
}
