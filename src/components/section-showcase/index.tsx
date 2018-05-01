import * as React from "react";

import "./style.css";
import { Gallery } from "../gallery/index";
import { Paged, Project } from "../../types";
import { theme } from "../../configs";

export interface IShowCaseProps {
  data: {
    [index: string]: Paged<Project>;
    gallery: Paged<Project>;
    experiments: Paged<Project>;
    caseStudies: Paged<Project>;
  };
}

export class SectionShowcase extends React.Component<IShowCaseProps, any> {
  constructor(props: IShowCaseProps) {
    super(props);
  }

  onLoadMore = () => {
    if (typeof document !== "undefined") {
      console.log("distpach resize");
      window.dispatchEvent(new Event("resize"));
    }
  };

  render() {
    const { data } = this.props;

    return (
      <section className={`showcase`}>
        <Gallery
          title={"gallery"}
          page={data.gallery}
          className={"xx-xx-x-x-x-x"}
          color={theme.colors.green}
          onLoadMore={this.onLoadMore}
        />
        <Gallery
          title={"case studies"}
          page={data.caseStudies}
          className={"xx-xx"}
          color={theme.colors.green}
          onLoadMore={this.onLoadMore}
        />
        <Gallery
          title={"experiments"}
          page={data.experiments}
          className={"x-x-x-x"}
          color={theme.colors.green}
          onLoadMore={this.onLoadMore}
        />
      </section>
    );
  }
}
