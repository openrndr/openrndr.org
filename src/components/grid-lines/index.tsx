import * as React from "react";

import { theme } from "../../configs";

import "./style.css";
import { calcColumnLeftPosition } from "../../utils/index";
import { number } from "prop-types";

interface IState {
  numberOfColumns: number;
}

export class GridLines extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      numberOfColumns: -1
    };
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
    this.setState({
      numberOfColumns: window.innerWidth <= 1024 ? 3 : 5
    });
  };

  render() {
    if (this.state.numberOfColumns === -1) {
      return null;
    }

    return (
      <div className={"grid-lines"}>
        {[0, 1, 2, 3, 4, 6].slice(0, this.state.numberOfColumns).map(i => (
          <div
            key={`color-bar-${i}`}
            className={"color-bar"}
            style={{
              background: theme.colors.pink,
              left: calcColumnLeftPosition(i, this.state.numberOfColumns)
            }}
          />
        ))}
      </div>
    );
  }
}
