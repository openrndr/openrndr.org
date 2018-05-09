import * as React from "react";

import { GettingStarted } from "../../types";
import "./style.css";
import { TextBlock } from "../text-block/index";

interface IProps {
  data: GettingStarted;
}

export const SectionGettingStarted: React.SFC<IProps> = ({ data }) => {
  return (
    <div className={"getting-started-wrapper"}>
      <a href={`https://github.com/openrndr/openrndr`} target={"_blank"}>
        <h1>SOURCE CODE ON GITHUB</h1>
      </a>

      <section className={`x-x-x-x`}>
        {data.contentBlocks.map((cb, i) => (
          <TextBlock key={`text-block${i}`} data={cb} />
        ))}
      </section>
    </div>
  );
};
