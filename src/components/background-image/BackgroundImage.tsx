import React from "react";
import Imgix from "react-imgix";
import { Image as ImageType } from "../../types";

interface IProps {
  data: ImageType;
}

export const BackgroundImage: React.SFC<IProps> = ({ data }) => {
  const { file: { url } } = data;
  return (
    <Imgix
      type="bg"
      imgProps={{
        style: {
          backgroundSize: "fill",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: `100%`,
          height: `100%`
        }
      }}
      src={url}
    />
  );
};
