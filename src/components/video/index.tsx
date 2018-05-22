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
  return (
    <ReactPlayer
      url={url}
      controls={false}
      muted={true}
      preload={true}
      {...rest}
      onReady={() => {
        console.log("ready?");
      }}
      onBuffer={() => {
        console.log("onBuffer?");
      }}
      onProgress={args => {
        console.log(args);
      }}
    />
  );
};
