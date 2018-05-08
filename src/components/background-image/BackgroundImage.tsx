import React from "react";
import Imgix from "react-imgix";
import { Image as ImageType } from "../../types";

interface IProps {
  data: ImageType;
  crop?: string;
  fit?: string;
}

export const BackgroundImage: React.SFC<IProps> = ({
  data,
  crop = "fit",
  fit = "fill"
}) => {
  const {
    file: { url }
  } = data;
  return (
    <Imgix
      type="bg"
      fit={"fill"}
      imgProps={{
        style: {
          // backgroundSize: "fill",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: `100%`,
          height: `100%`
        }
      }}
      src={url}
    />
  );
};
