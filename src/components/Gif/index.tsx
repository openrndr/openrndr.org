import React from "react";
import { Gif as GifType } from "../../types";

interface Props {
  data: GifType;
}

export const Gif: React.SFC<Props> = ({ data }) => {
  const { url } = data;
  return <img src={url} />;
};
