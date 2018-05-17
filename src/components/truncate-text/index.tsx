import * as React from "react";
import { Fade, Slide } from "react-reveal";
import { debounce } from "lodash";

interface IProps {
  text: string;
  active: boolean;
}

interface IState {
  charsPerLine: number;
}

export class TruncateText extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      charsPerLine: 0
    };
    this.onResize = debounce(this.onResize, 500);
  }

  componentDidMount() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    if (typeof document !== "undefined") {
      window.removeEventListener("resize", this.onResize);
    }
  }

  onResize = () => {
    if (typeof document !== "undefined") {
      this.setState({
        charsPerLine: window.innerWidth / 43.46378906
      });
    }
  };

  calcVisibleLength = () => {
    if (typeof document !== "undefined") {
      const lines = window.innerWidth > 1400 ? 7 : 5;
      return ~~this.state.charsPerLine * lines;
    }
    return this.props.text.length;
  };

  render() {
    const { text, active } = this.props;
    return (
      <article
        dangerouslySetInnerHTML={{
          __html: active
            ? `${text.slice(0, this.calcVisibleLength())}...`
            : text
        }}
      />
    );
  }
}
