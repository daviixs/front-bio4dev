import React from "react";
import { TemplateView } from "../shared/TemplateView";
import type { InfluencerTemplateData } from "./types";
import { TEMPLATE_ID } from "./types";

interface ViewProps {
  data?: InfluencerTemplateData;
}

export default function View({ data }: ViewProps) {
  return <TemplateView templateId={TEMPLATE_ID} data={data} />;
}
