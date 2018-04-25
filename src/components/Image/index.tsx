import React from "react";
import Imgix from "react-imgix";
import { Image as ImageType } from "../../types";

interface Props {
  data: ImageType;
}

export const Image: React.SFC<Props> = ({ data }) => {
  const { url } = data;
  return <Imgix src={url} />;
};
