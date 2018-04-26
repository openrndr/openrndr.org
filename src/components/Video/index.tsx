import React from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import { Video as VideoType } from "../../types";

export interface IProps {
  data: VideoType;
}

export const Video: React.SFC<IProps & ReactPlayerProps> = ({
  data,
  ...rest
}) => {
  const { url } = data.file;
  return <ReactPlayer url={url} controls={false} muted={true} {...rest} />;
};
