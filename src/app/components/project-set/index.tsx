import React, { ReactNode } from "react";
import styled from "styled-components";
import {Project as ProjectType} from "../../../types/index";

import Project from '../project';

interface Props {
  data:{
    title: string;
    items: ProjectType[];
  }
}

const Wrapper = styled.div`
  background: blue;
  display: grid;
`;

const ProjectsWrapper = styled.div`
  background: #0e0303;
  display: grid;
`;

export default (props: Props) => {
  const {title, items} = props.data;
  return (
      <Wrapper>
        <h1>{title}</h1>
        <ProjectsWrapper>
          {
            items.map(project=><Project data={project}/>)
          }
        </ProjectsWrapper>
      </Wrapper>
  );
};
