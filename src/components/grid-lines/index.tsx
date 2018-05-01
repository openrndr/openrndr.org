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
      numberOfColumns: 5
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
    return (
      <div className={"grid-lines"}>
        {Object.keys(theme.colors)
          .map(key => theme.colors[key])
          .slice(0, this.state.numberOfColumns - 1)
          .map((color: string, i) => (
            <div
              key={`color-bar-${i}`}
              className={"color-bar"}
              style={{
                background: color,
                left: calcColumnLeftPosition(i + 1, this.state.numberOfColumns)
              }}
            />
          ))}
      </div>
    );
  }
}
