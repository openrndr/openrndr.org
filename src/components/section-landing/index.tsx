import * as React from "react";

import { Landing } from "../../types";
import "./style.css";
import { TextBlock } from "../text-block/index";
import { Banner } from "../banner/index";

interface IProps {
  data: Landing;
}

export const SectionLanding: React.SFC<IProps> = ({ data }) => {
  return (
    <section className={`xx-x-x`}>
      {data.contentBlocks.map((cb, i) => (
        <TextBlock key={`text-block${i}`} data={cb} />
      ))}
    </section>
  );
};
