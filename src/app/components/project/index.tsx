import React, { ReactNode } from "react";
import styled from "styled-components";
import {Project} from "../../../types/";
import Image from "../image";

interface Props {
  data: Project;
}

const Wrapper = styled.section`
  background: blue;
  display: grid;
`;

const MediaWrapper = styled.div`
  background: black;
`;

const InfoWrapper = styled.article`
  background: pink;
`;

export default (props: Props) => {
  const {title, blurb, media} = this.props.data;
  const thumbnail = media[0];

  return (
    <Wrapper>
      <MediaWrapper>
        {
          thumbnail.itemType==="image" &&
          <Image data={thumbnail} />
        }
      </MediaWrapper>
      <InfoWrapper>
        {
          (title && title.length>0) &&
              <strong>{title}</strong>
        }
        {
          (blurb && blurb.length>0) &&
          <p>{blurb}</p>
        }
      </InfoWrapper>
    </Wrapper>
  );
};
