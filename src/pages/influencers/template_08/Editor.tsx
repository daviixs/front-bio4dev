import React from "react";
import { TemplateEditor } from "../shared/TemplateEditor";
import { TEMPLATE_ID } from "./types";

export default function Editor() {
  return <TemplateEditor templateId={TEMPLATE_ID} />;
}
