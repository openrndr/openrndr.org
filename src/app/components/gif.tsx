import React from "react";
import { Gif as GifType } from "../../types";

interface Props {
  data: GifType;
}

export default class Gif extends React.Component<Props> {
  render() {
    const { url } = this.props.data;
    return <img src={url} />;
  }
}
