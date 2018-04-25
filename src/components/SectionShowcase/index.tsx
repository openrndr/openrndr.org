import * as React from "react";

import "./style.css";
import { IShowCaseProps } from "../../types/props";
import { Gallery } from "../Gallery";

interface IProps {
  data: IShowCaseProps;
}

export const SectionShowcase: React.SFC<IProps> = ({ data }) => {
  return (
    <section className={`showcase`}>
      <Gallery title={"gallery"} data={data.gallery} />
    </section>
  );
};
