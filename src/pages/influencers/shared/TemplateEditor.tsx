import React from "react";
import { InfluencerOnboardingPage } from "@/pages/InfluencerOnboardingPage";
import type { InfluencerTemplateId } from "./templateMap";

export function TemplateEditor({ templateId }: { templateId: InfluencerTemplateId }) {
  return <InfluencerOnboardingPage templateId={templateId} />;
}
