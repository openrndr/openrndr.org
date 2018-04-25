import * as React from "react";

import { About } from "../../types";
import "./style.css";
import { TextBlock } from "../TextBlock/index";

interface IProps {
  data: About;
}

export const SectionAbout: React.SFC<IProps> = ({ data }) => {
  return (
    <section className={`xx-x-x`}>
      {data.contentBlocks.map((cb, i) => (
        <TextBlock key={`text-block${i}`} data={cb} />
      ))}
    </section>
  );
};
