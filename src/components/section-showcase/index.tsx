import * as React from "react";

import "./style.css";
import { Gallery } from "../gallery/index";
import { Paged, Project } from "../../types";

export interface IShowCaseProps {
  data: {
    [index: string]: Paged<Project>;
    gallery: Paged<Project>;
    experiments: Paged<Project>;
    caseStudies: Paged<Project>;
  };
}

export const SectionShowcase: React.SFC<IShowCaseProps> = ({ data }) => {
  return (
    <section className={`showcase`}>
      <Gallery
        title={"gallery"}
        page={data.gallery}
        className={"xx-xx-x-x-x-x"}
      />
      <Gallery
        title={"case studies"}
        page={data.caseStudies}
        className={"xx-xx"}
      />
      <Gallery
        title={"experiments"}
        page={data.experiments}
        className={"x-x-x-x"}
      />
    </section>
  );
};
