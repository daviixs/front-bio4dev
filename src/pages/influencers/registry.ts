import React from "react";
import type { InfluencerTemplateId } from "./shared/templateMap";

import Editor04 from "./template_04/Editor";
import Preview04 from "./template_04/Preview";
import View04 from "./template_04/View";
import * as services04 from "./template_04/services";

import Editor05 from "./template_05/Editor";
import Preview05 from "./template_05/Preview";
import View05 from "./template_05/View";
import * as services05 from "./template_05/services";

import Editor06 from "./template_06/Editor";
import Preview06 from "./template_06/Preview";
import View06 from "./template_06/View";
import * as services06 from "./template_06/services";

import Editor07 from "./template_07/Editor";
import Preview07 from "./template_07/Preview";
import View07 from "./template_07/View";
import * as services07 from "./template_07/services";

import Editor08 from "./template_08/Editor";
import Preview08 from "./template_08/Preview";
import View08 from "./template_08/View";
import * as services08 from "./template_08/services";

import Editor09 from "./template_09/Editor";
import Preview09 from "./template_09/Preview";
import View09 from "./template_09/View";
import * as services09 from "./template_09/services";

import Editor10 from "./template_10/Editor";
import Preview10 from "./template_10/Preview";
import View10 from "./template_10/View";
import * as services10 from "./template_10/services";

import Editor11 from "./template_11/Editor";
import Preview11 from "./template_11/Preview";
import View11 from "./template_11/View";
import * as services11 from "./template_11/services";

import Editor12 from "./template_12/Editor";
import Preview12 from "./template_12/Preview";
import View12 from "./template_12/View";
import * as services12 from "./template_12/services";

import Editor13 from "./template_13/Editor";
import Preview13 from "./template_13/Preview";
import View13 from "./template_13/View";
import * as services13 from "./template_13/services";

import Editor14 from "./template_14/Editor";
import Preview14 from "./template_14/Preview";
import View14 from "./template_14/View";
import * as services14 from "./template_14/services";

export const templateRegistry = {
  template_04: { Editor: Editor04, Preview: Preview04, View: View04, services: services04 },
  template_05: { Editor: Editor05, Preview: Preview05, View: View05, services: services05 },
  template_06: { Editor: Editor06, Preview: Preview06, View: View06, services: services06 },
  template_07: { Editor: Editor07, Preview: Preview07, View: View07, services: services07 },
  template_08: { Editor: Editor08, Preview: Preview08, View: View08, services: services08 },
  template_09: { Editor: Editor09, Preview: Preview09, View: View09, services: services09 },
  template_10: { Editor: Editor10, Preview: Preview10, View: View10, services: services10 },
  template_11: { Editor: Editor11, Preview: Preview11, View: View11, services: services11 },
  template_12: { Editor: Editor12, Preview: Preview12, View: View12, services: services12 },
  template_13: { Editor: Editor13, Preview: Preview13, View: View13, services: services13 },
  template_14: { Editor: Editor14, Preview: Preview14, View: View14, services: services14 },
} satisfies Record<
  InfluencerTemplateId,
  {
    Editor: React.ComponentType;
    Preview: React.ComponentType;
    View: React.ComponentType<{ data?: any }>;
    services: {
      load: (profileId: string) => Promise<any>;
      saveAll: (profileId: string, data: any, currentProfile?: any) => Promise<void>;
    };
  }
>;

export const influencerTemplateIds = Object.keys(
  templateRegistry,
) as InfluencerTemplateId[];
