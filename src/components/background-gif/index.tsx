import React from "react";
import { Gif as GifType } from "../../types";

interface IProps {
  data: GifType;
}

export const BackgroundGif: React.SFC<IProps> = ({ data }) => {
  const {
    file: { url }
  } = data;

  return (
    <div
      style={{
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: `100%`,
        height: `100%`
      }}
    />
  );
};
