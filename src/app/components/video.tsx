import React from "react";
import ReactPlayer from "react-player";
import { Video as VideoType } from "../../types";

interface Props {
  data: VideoType;
}

export default class Video extends React.Component<Props> {
  render() {
    const { url } = this.props.data.file;
    return <ReactPlayer url={url} />;
  }
}
