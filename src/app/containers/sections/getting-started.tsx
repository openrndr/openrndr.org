import * as React from "react";

import {
  GettingStarted as GettingStartedDataType,
  SectionMetadata
} from "../../../types/index";

import { Section } from "../../components/section/index";
import { SectionHeader } from "../../components/section/section-header";
import { SectionBody } from "../../components/section/section-body";
import { TextSet } from "../../components/text-set/index";
import { LinkBanner } from "../../components/linkBanner";

interface Props {
  metadata: SectionMetadata;
  data: GettingStartedDataType;
}

export const GettingStartedSection: React.StatelessComponent<Props> = ({
  metadata,
  data
}) => (
  <Section metadata={metadata}>
    <SectionHeader>
      <LinkBanner link={"http://github.com"} linkTitle={"Source code Github"}>
        <h1>metadata.title</h1>
      </LinkBanner>
    </SectionHeader>
    <SectionBody>
      <TextSet data={data.contentBlocks} className={"columns-4"} />
    </SectionBody>
  </Section>
);
