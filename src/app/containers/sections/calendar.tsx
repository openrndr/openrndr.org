import * as React from "react";

import { Event, Paged, SectionMetadata } from "../../../types/index";

import { Section } from "../../components/section/index";
import { SectionHeader } from "../../components/section/section-header";
import { SectionBody } from "../../components/section/section-body";
import { EventSet } from "../../components/event-set/index";

interface Props {
  metadata: SectionMetadata;
  data: {
    events: Paged<Event>;
  };
}

export const CalendarSection: React.StatelessComponent<Props> = ({
  metadata,
  data
}) => (
  <Section metadata={metadata}>
    <SectionHeader>
      <h2>{metadata.title}</h2>
    </SectionHeader>
    <SectionBody>
      <EventSet title={"Events"} events={data.events.data} />
    </SectionBody>
  </Section>
);
