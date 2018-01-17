import React from "react";
import Imgix from "react-imgix";
import { Gif as GifType } from "../../types";

interface Props {
  data: GifType;
}

export default class Gif extends React.Component<Props> {
  render() {
    const { url } = this.props.data.file;
    return <Imgix src={url} />;
  }
}
