import * as React from "react";

import { theme } from "../../configs";

import "./style.css";
import { calcColumnLeftPosition } from "../../utils/index";

export const GridLines: React.SFC<any> = () => (
  <div className={"grid-lines"}>
    {Object.keys(theme.colors)
      .map(key => theme.colors[key])
      .slice(0, Object.keys(theme.colors).length - 2)
      .map((color: string, i) => (
        <div
          key={`color-bar-${i}`}
          className={"color-bar"}
          style={{
            background: color,
            left: calcColumnLeftPosition(i + 1)
          }}
        />
      ))}
  </div>
);
