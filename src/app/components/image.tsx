import React from "react";
import Imgix from "react-imgix";
import { Image as ImageType } from "../../types";

interface Props {
  data: ImageType;
}

export default class Image extends React.Component<Props> {
  render() {
    const { url } = this.props.data.file;
    return <Imgix src={url} />;
  }
}
