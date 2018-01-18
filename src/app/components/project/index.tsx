import React, { ReactNode } from "react";
import styled from "styled-components";

import { Project } from "../../../types/";

import BgImage from '../background-image';
import BgGif from '../background-gif';
import Video from "../video";

interface Props {
  data: Project;
}

const Wrapper = styled.div`
  overflow: hidden;
  border: 1px solid white;
  
  
  display: grid;
  grid-template-rows: 3fr 1fr;
  
  >*{
    border: 1px solid yellow;
  }
  
  .project-media{
    
  }
  
  &:nth-child(n+3){
    .blurb{
      display: none;
    }
  } 
  .project-media{
    width: 100%;  
  }
`;


export default (props: Props) => {
  const { title, blurb, media } = props.data;
  const thumbnail = media[0];

  return (
    <Wrapper>
      <div className={"project-media"}>
        {(function() {
          switch (thumbnail.itemType) {
            case "image":
              return <BgImage data={thumbnail} />;
            case "gif":
              return <BgGif data={thumbnail} />;
            case "video":
              return <Video data={thumbnail}
                            controls={false}
                            width={`100%`}
                            height={`100%`}
              />;
          }
        })()}
      </div>
      <div className={"project-info"}>
        {title && title.length > 0 && <strong className={"title"}>{title}</strong>}
        {blurb && blurb.length > 0 && <p className={"blurb"}
                                         dangerouslySetInnerHTML={{
                                           __html: blurb
                                         }}/>}
      </div>
    </Wrapper>
  );
};
