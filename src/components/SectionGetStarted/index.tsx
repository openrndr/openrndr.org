import * as React from "react";

import { GettingStarted } from "../../types";
import "./style.css";
import { TextBlock } from "../TextBlock/index";

interface IProps {
  data: GettingStarted;
}

export const SectionGettingStarted: React.SFC<IProps> = ({ data }) => {
  return (
    <section className={`x-x-x-x`}>
      {data.contentBlocks.map((cb, i) => (
        <TextBlock key={`text-block${i}`} data={cb} />
      ))}
    </section>
  );
};
