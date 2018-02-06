import * as React from "react";

import { About as AboutDataType, SectionMetadata } from "../../../types/index";

import { Section } from "../../components/section/index";
import { SectionHeader } from "../../components/section/section-header";
import { SectionBody } from "../../components/section/section-body";
import { TextSet } from "../../components/text-set/index";

interface Props {
  metadata: SectionMetadata;
  data: AboutDataType;
}

export const AboutSection: React.StatelessComponent<Props> = ({
  metadata,
  data
}) => (
  <Section metadata={metadata}>
    <SectionHeader>
      <h2>{metadata.title}</h2>
    </SectionHeader>
    <SectionBody>
      <TextSet data={data.contentBlocks} className={"columns-3"} />
    </SectionBody>
  </Section>
);
