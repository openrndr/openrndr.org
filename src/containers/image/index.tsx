import React from "react";
import Imgix from "react-imgix";
import { Image as ImageType } from "../../types";

interface IProps {
  data: ImageType;
}

export const Image: React.SFC<IProps> = ({ data }) => {
  const {
    file: { url }
  } = data;
  return <Imgix src={url} />;
};
