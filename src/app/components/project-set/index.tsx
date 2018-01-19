import React, { ReactNode } from "react";
import styled from "styled-components";
import { Paged, Project as ProjectType } from "../../../types/index";

import Project from "../project";
import { withPagination } from "../paginated";

// type Props = PaginatedProps<ProjectType>;
interface Props {
  title: string;
  loading: boolean;
  data: ProjectType[];
  loadNext: () => any;
  hasNext: boolean;
}

const Wrapper = styled.div`
  h3 {
    text-transform: uppercase;
  }
  .load-more {
    cursor: pointer;
    padding: 10px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  //Default mode
  .project:first-child {
    grid-column: 1 / 3;
  }
  .project:nth-child(2) {
    grid-column: 3 / 5;
  }

  .project {
    height: 400px;
  }
  .project:nth-child(n + 3) {
    height: 300px;
  }

  &.no-small-thumb {
    grid-template-columns: repeat(2, 1fr);
    .project {
      grid-column: auto;
      height: 400px;
    }
  }

  &.no-large-thumb {
    grid-template-columns: repeat(4, 1fr);
    .project {
      grid-column: auto;
      height: 300px;
    }
  }
`;

const layoutMode: any = {
  gallery: "",
  experiments: "no-small-thumb",
  caseStudies: "no-large-thumb"
};

const ProjectSet = (props: Props) => {
  const { hasNext, loadNext } = props;
  return (
    <Wrapper>
      <h3>{props.title}</h3>
      <Grid className={layoutMode[props.title]}>
        {props.data.map((project, i) => (
          <Project key={project.id} data={project} className={"project"} />
        ))}
      </Grid>
      <span className={"load-more"} onClick={hasNext ? loadNext : null}>
        {hasNext ? "MORE" : "No more pages to load"}
      </span>
    </Wrapper>
  );
};

export default withPagination(ProjectSet);
