import React from "react";
import styled from "styled-components";

import { Project as ProjectData } from "../../../types/";
import { ProjectMedia } from "./project-media";

interface Props {
  data: ProjectData;
  className?: string;
  onClick?(e: React.MouseEvent<HTMLElement>): void;
}

const Wrapper = styled.div`
  overflow: hidden;
  display: grid;
  grid-template-rows: 3fr 1.5fr;

  &:nth-child(n + 3) {
    .blurb {
      display: none;
    }
  }

  .project-media {
    width: 100%;
  }

  .project-info {
    padding: 10px;
  }
`;

const noop = (e: React.MouseEvent<HTMLElement>) => {};

export const Project: React.StatelessComponent<Props> = props => {
  const { className, onClick = noop } = props;
  const { title, blurb, media } = props.data;
  const thumbnail = media[0];

  return (
    <Wrapper className={className} onClick={onClick}>
      <ProjectMedia thumbnail={thumbnail} />
      <div className={"project-info"}>
        {title && title.length > 0 && <span className={"title"}>{title}</span>}
        {blurb &&
          blurb.length > 0 && (
            <p
              className={"blurb"}
              dangerouslySetInnerHTML={{
                __html: blurb
              }}
            />
          )}
      </div>
    </Wrapper>
  );
};
