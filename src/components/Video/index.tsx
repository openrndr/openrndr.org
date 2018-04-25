import React from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import { Video as VideoType } from "../../types";

export interface Props {
  data: VideoType;
}

export const Video: React.SFC<Props & ReactPlayerProps> = ({
  data,
  ...rest
}) => {
  const { url } = data.file;
  return <ReactPlayer url={url} controls={false} muted={true} {...rest} />;
};
