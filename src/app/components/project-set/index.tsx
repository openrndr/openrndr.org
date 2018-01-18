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
  background: lightblue;
  h3 {
    text-transform: uppercase;
  }
  .load-more {
    cursor: pointer;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  //TODO make different layouts for different sets

  > *:first-child {
    grid-column: 1 / 3;
  }

  > *:nth-child(2) {
    grid-column: 3 / 5;
  }
`;

const ProjectSet = (props: Props) => {
  const { hasNext, loadNext } = props;
  return (
    <Wrapper>
      <h3>{props.title}</h3>
      <Grid>
        {props.data.map(project => <Project key={project.id} data={project} />)}
      </Grid>
      <span className={"load-more"} onClick={hasNext ? loadNext : null}>
        {hasNext ? "Load more" : "No more pages to load"}
      </span>
    </Wrapper>
  );
};

export default withPagination(ProjectSet);
