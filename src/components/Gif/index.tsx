import React from "react";
import { Gif as GifType } from "../../types";

interface IProps {
  data: GifType;
}

export const Gif: React.SFC<IProps> = ({ data }) => {
  const { url } = data;
  return <img src={url} />;
};
