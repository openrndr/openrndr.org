import React from "react";
import ReactPlayer, {ReactPlayerProps} from "react-player";
import { Video as VideoType } from "../../types";

interface Props {
  data: VideoType;
}

export default class Video extends React.Component<Props & ReactPlayerProps> {
  render() {
    const {data, ...rest} = this.props;

    const { url } = data.file;
    return <ReactPlayer url={url} controls={false} muted={true} {...rest}/>;
  }
}