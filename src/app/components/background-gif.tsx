import React from "react";
import { Gif as GifType } from "../../types";

interface Props {
  data: GifType;
}

export default class BgGif extends React.Component<Props> {
  render() {
    const { url } = this.props.data;
    return <div style={{
      backgroundImage: `url(${url})`,
      backgroundSize: 'fill',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: `100%`,
      height: `100%`
    }}/>;
  }
}
