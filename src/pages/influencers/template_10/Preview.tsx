import React from "react";
import { TemplatePreview } from "../shared/TemplatePreview";
import { TEMPLATE_ID } from "./types";

export default function Preview() {
  return <TemplatePreview templateId={TEMPLATE_ID} />;
}
