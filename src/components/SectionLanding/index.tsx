import * as React from "react";

import {Landing} from "../../types";
import "./style.css";
import {TextSet} from "../TextSet/index";
import {TextBlock} from "../TextBlock/index";

interface IProps {
  data: Landing
}

export const SectionLanding: React.SFC<IProps> = ({data}) => {
  return (
    <section className={`xx-x-x`}>
      {
        data.contentBlocks.map((cb, i) =>
            <TextBlock key={`text-block${i}`}
                       data={cb} />
        )
      }
    </section>
  )
};