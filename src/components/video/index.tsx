import React from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import { IDatoVideoFile } from "../../types";

export interface IProps {
  data: IDatoVideoFile;
}

export const Video: React.SFC<IProps & ReactPlayerProps> = ({
  data,
  ...rest
}) => {
  const { url } = data;
  return <ReactPlayer url={url} controls={false} muted={true} {...rest} />;
};
