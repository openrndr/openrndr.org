import * as React from "react";

import { uiConfigs } from "../../configs";

import "./style.css";

export const GridLines: React.SFC<any> = () => (
  <div className={"grid-lines"}>
    {uiConfigs.colors.map((color: string, i) => (
      <div
        key={`color-bar-${i}`}
        className={"color-bar"}
        style={{
          background: color,
          left: `calc(calc(${i * 0.2} * calc(100vw - 40px)) + 20px)`
        }}
      />
    ))}
  </div>
);
