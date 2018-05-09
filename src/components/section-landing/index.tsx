import * as React from "react";

import { Landing } from "../../types";
import "./style.css";
import { TextBlock } from "../text-block/index";

interface IProps {
  data: Landing;
}

export const SectionLanding: React.SFC<IProps> = ({ data }) => {
  return (
    <section className={`landing-page xx-x-x`}>
      {data.contentBlocks.map((cb, i) => (
        <TextBlock
          key={`text-block${i}`}
          data={cb}
          className={i === 0 ? "large-text" : ""}
        />
      ))}
    </section>
  );
};
