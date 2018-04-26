import * as React from "react";

import { uiConfigs } from "../../configs";

import "./style.css";
import { calcColumnLeftPosition } from "../../utils/index";

export const GridLines: React.SFC<any> = () => (
  <div className={"grid-lines"}>
    {uiConfigs.colors.map((color: string, i) => (
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
