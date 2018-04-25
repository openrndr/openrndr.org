import * as React from "react";

import { Community } from "../../types";
import "./style.css";
import { TextBlock } from "../TextBlock/index";

interface IProps {
  data: Community;
}

export const SectionCommunity: React.SFC<IProps> = ({ data }) => {
  return (
    <section className={`xx-x-x`}>
      {data.contentBlocks.map((cb, i) => (
        <TextBlock key={`text-block${i}`} data={cb} />
      ))}
    </section>
  );
};
