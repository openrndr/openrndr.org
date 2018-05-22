import React from "react";
import { Image as ImageType } from "../../types";

interface IProps {
  data: ImageType;
  style?: object;
}

export interface IImageState {
  isLoaded: boolean;
}

import "./style.css";

export class Image extends React.Component<IProps, IImageState> {
  constructor(props: IProps) {
    super(props);
    this.state = { isLoaded: false };
  }

  onLoad = () => {
    this.setState({ isLoaded: true });
  };

  render() {
    const { data, style = {} } = this.props;
    const {
      file: { url }
    } = data;

    return <img src={url} onLoad={this.onLoad} style={style} />;
  }
}
