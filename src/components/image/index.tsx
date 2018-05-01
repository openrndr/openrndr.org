import React from "react";
import Imgix from "react-imgix";
import { Image as ImageType } from "../../types";

interface IProps {
  data: ImageType;
  fit?: string;
}

export const Image: React.SFC<IProps> = ({ data, fit = "clip" }) => {
  const {
    file: { url }
  } = data;
  return <Imgix src={url} fit={fit} />;
};
