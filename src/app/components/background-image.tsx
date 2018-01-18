import React from "react";
import Imgix from "react-imgix";
import { Image as ImageType } from "../../types";


interface Props {
  data: ImageType;
}

export default class BgImage extends React.Component<Props> {
  render() {
    const { url } = this.props.data.file;
    return <Imgix type='bg'
                  imgProps={{
                    style: {
                      backgroundSize: 'fill',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      width: `100%`,
                      height: `100%`
                    }
                  }}
                  src={url} />;
  }
}
