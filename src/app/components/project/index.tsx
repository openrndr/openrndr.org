import React, {ReactNode} from "react";
import styled from "styled-components";

import Image from '../image';

interface Props {
  data: any;
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

const demoImageData={
      itemType: "image",
      "updatedAt": "2018-01-16T13:20:46.718Z",
      "createdAt": "2018-01-16T13:20:46.681Z",
      "file": {
        "format": "png",
        "size": 2126394,
        "width": 1544,
        "height": 872,
        "title": "title",
        "alt": "alt",
        "url": "https://www.datocms-assets.com/4385/1516108794-screen-shot-2018-01-16-at-14-19-48.png"
      },
      "caption": "caption"
};

export default (props: Props) => {
  return (
      <Wrapper>
        <MediaWrapper>
          <Image data={demoImageData}/>
        </MediaWrapper>
        <InfoWrapper>
        </InfoWrapper>
      </Wrapper>
  );
};
