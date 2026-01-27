import React from "react";
import { PortfolioData, TemplateType } from "../../services/api/types";
import { isInfluencerTemplate } from "@/pages/influencers/shared/templateMap";
import { mapPortfolioDataToInfluencerData } from "@/pages/influencers/shared/mappers";

// Importar templates existentes
import { Template01 } from "../../templates/Template01";
import { Template02 } from "../../templates/Template02";
import { Template03 } from "../../templates/Template03";
import View04 from "@/pages/influencers/template_04/View";
import View05 from "@/pages/influencers/template_05/View";
import View06 from "@/pages/influencers/template_06/View";
import View07 from "@/pages/influencers/template_07/View";
import View08 from "@/pages/influencers/template_08/View";
import View09 from "@/pages/influencers/template_09/View";
import View10 from "@/pages/influencers/template_10/View";
import View11 from "@/pages/influencers/template_11/View";
import View12 from "@/pages/influencers/template_12/View";
import View13 from "@/pages/influencers/template_13/View";
import View14 from "@/pages/influencers/template_14/View";


interface TemplateProps {
  data: PortfolioData;
  previewMode?: boolean;
}

/**
 * Wrapper temporário para adaptar templates antigos que usam `profile` prop
 * até que sejam migrados para usar `data` prop
 */
const TemplateWrapper = ({
  Component,
  data,
  previewMode,
}: {
  Component: any;
  data: PortfolioData;
  previewMode?: boolean;
}) => {
  // @ts-ignore - Temporário até migração completa
  return <Component profile={data} data={data} previewMode={previewMode} />;
};

/**
 * Mapeamento dos templateTypes para os componentes React correspondentes
 *
 * Cada template recebe o objeto PortfolioData completo com todos os dados
 * necessários para renderização (perfil, projetos, social, etc.)
 */
const TEMPLATE_COMPONENTS: Record<TemplateType, React.ComponentType<any>> = {
  // Template 01: Dev/Tech Portfolio
  [TemplateType.template_01]: Template01,

  // Template 02: Design/Creative
  [TemplateType.template_02]: Template02,

  // Template 03: Business/Corporate
  [TemplateType.template_03]: Template03,

  // Template 04-14: Influencers (View components)
  [TemplateType.template_04]: View04,
  [TemplateType.template_05]: View05,
  [TemplateType.template_06]: View06,
  [TemplateType.template_07]: View07,
  [TemplateType.template_08]: View08,
  [TemplateType.template_09]: View09,
  [TemplateType.template_10]: View10,
  [TemplateType.template_11]: View11,
  [TemplateType.template_12]: View12,
  [TemplateType.template_13]: View13,
  [TemplateType.template_14]: View14,
};

/**
 * Componente TemplateRenderer
 *
 * Renderiza dinamicamente o template correto com base no templateType
 * recebido dos dados do portfolio. Também exibe um banner de preview
 * quando o portfolio não está publicado.
 */
export function TemplateRenderer({ data, previewMode = false }: TemplateProps) {
  const TemplateComponent = TEMPLATE_COMPONENTS[data.templateType];

  if (!TemplateComponent) {
    return (
      <div
        style={{
          padding: "2rem",
          textAlign: "center",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8fafc",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          ⚠️ Template não encontrado
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#64748b" }}>
          O template "{data.templateType}" não está disponível.
        </p>
      </div>
    );
  }

  return (
    <>
      {previewMode && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "0.75rem",
            textAlign: "center",
            zIndex: 9999,
            fontSize: "0.9rem",
            fontWeight: 500,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          🔍 Modo Preview - Este portfolio não está publicado publicamente
        </div>
      )}
      <div style={previewMode ? { marginTop: "3rem" } : {}}>
        {isInfluencerTemplate(data.templateType) ? (
          <TemplateComponent
            data={mapPortfolioDataToInfluencerData(data)}
            previewMode={previewMode}
          />
        ) : (
          <TemplateWrapper
            Component={TemplateComponent}
            data={data}
            previewMode={previewMode}
          />
        )}
      </div>
    </>
  );
}
