import React, { ReactNode } from "react";
import styled from "styled-components";
import { Paged, Project as ProjectType } from "../../../types/index";

import { withPagination } from "../paginated";
import { noOp } from "../../no-op";
import { Project } from "../project/index";
import { SlideShow } from "../Slideshow/index";

// type Props = PaginatedProps<ProjectType>;

const Wrapper = styled.div`
  h3 {
    text-transform: uppercase;
  }

  margin-bottom: 40px;

  .load-more {
    cursor: pointer;
    padding: 10px;
    position: absolute;
    width: 100%;
    display: grid;
    left: 0;
    grid-template-columns: repeat(5, 1fr);
    border-top: 1px solid;
    border-bottom: 1px solid;
    height: 20px;
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

interface State {
  slideShowData: ProjectType | null;
}

interface Props {
  title: string;
  loading: boolean;
  data: ProjectType[];
  loadNext: () => any;
  hasNext: boolean;
}

export class ProjectSetComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      slideShowData: null
    };
  }

  setSlideShow = (slideShowData: ProjectType): void => {
    this.setState({ slideShowData });
  };

  unsetSlideShow = (e: React.MouseEvent<HTMLElement>): void => {
    this.setState({
      slideShowData: null
    });
  };

  render() {
    const { props } = this;
    const { hasNext, loadNext } = props;
    const { slideShowData } = this.state;

    return (
      <Wrapper>
        <h3>{props.title}</h3>
        <Grid className={layoutMode[props.title]}>
          {props.data.map((project, i) => (
            <Project
              key={project.id}
              data={project}
              className={"project"}
              onClick={(e: React.MouseEvent<HTMLElement>) =>
                this.setSlideShow(project)
              }
            />
          ))}
        </Grid>
        <div className={"load-more"}>
          <span className={"gap"} />
          <span onClick={hasNext ? loadNext : noOp}>
            {hasNext ? "MORE" : "No more pages to load"}
          </span>
        </div>
        {slideShowData && (
          <SlideShow data={slideShowData} onClose={this.unsetSlideShow} />
        )}
      </Wrapper>
    );
  }
}

export const ProjectSet = withPagination(ProjectSetComponent);
