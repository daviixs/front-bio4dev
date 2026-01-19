Influencer Templates
====================

Rotas
-----
- /dashboard/influencer/:templateId/:profileId/edit
- /dashboard/influencer/:templateId/:profileId/preview
- /:username (publico) -> View via TemplateRenderer

Contrato de dados (base)
------------------------
```
export interface InfluencerTemplateData {
  id?: string;
  themeId: string;
  name: string;
  bio: string;
  photoUrl: string;
  socials: Array<{ id?: string; platform: string; url: string }>;
  buttons: Array<{
    id?: string;
    label: string;
    url: string;
    subtext?: string;
    icon?: string;
    style?: string;
  }>;
  metadata?: Record<string, unknown>;
}
```

Servicos esperados (por template)
---------------------------------
- load(profileId) -> usa profileApi.getComplete
- saveAll(profileId, data) -> legenda/social/linkButtons com idempotencia

Observacoes
-----------
- Cada template possui Editor, Preview e View.
- O Editor mantem estado local e persiste via useSaveTemplate.
- View/Preview renderizam via DynamicThemeRenderer (sem persistir).
