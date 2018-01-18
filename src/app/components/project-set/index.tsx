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
  background: blue;
  display: grid;
`;

const ProjectsWrapper = styled.div`
  background: #0e0303;
  display: grid;
`;

const ProjectSet = (props: Props) => {
  console.log("PROPS", props);
  return (
    <Wrapper>
      <h1>{props.title}</h1>
      <ProjectsWrapper>
        {props.data.map(project => {
          console.log(project);
          // return project.id;
          return <Project key={project.id} data={project} />;
        })}
      </ProjectsWrapper>
    </Wrapper>
  );
};

export default withPagination(ProjectSet);
