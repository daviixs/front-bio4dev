import type { ProfileComplete, TemplateType } from "@/types";
import {
  legendaApi,
  linkButtonsApi,
  profileApi,
  socialApi,
} from "@/lib/api";
import type { InfluencerTemplateData } from "./types";
import { mapProfileCompleteToInfluencerData } from "./mappers";
import { logError } from "@/lib/logger";

const DEFAULT_AVATAR_URL = "https://api.dicebear.com/7.x/avataaars/svg";

/**
 * Example: load(profileId)
 * Request: GET /profile/:id/complete
 * Response (excerpt):
 * {
 *   "id": "profile-id",
 *   "username": "creator",
 *   "templateType": "template_04",
 *   "legendas": [{ "id": "leg-1", "nome": "Nome", "descricao": "Bio" }],
 *   "social": [{ "id": "soc-1", "plataforma": "instagram", "url": "..." }],
 *   "linkButtons": [{ "id": "btn-1", "label": "Site", "url": "..." }]
 * }
 */
export async function load(
  profileId: string,
  templateId?: TemplateType,
): Promise<InfluencerTemplateData> {
  const profile = await profileApi.getComplete(profileId);
  return mapProfileCompleteToInfluencerData(profile, templateId);
}

/**
 * Example: saveAll(profileId, data)
 * Requests:
 * - POST /legenda or PATCH /legenda/:id
 * - POST /social (replace all)
 * - DELETE /link-buttons/profile/:profileId
 * - PUT /link-buttons/profile/:profileId
 * Response: { "message": "ok" }
 */
export async function saveAll(
  profileId: string,
  data: InfluencerTemplateData,
  currentProfile?: ProfileComplete,
): Promise<void> {
  const profile = currentProfile || (await profileApi.getComplete(profileId));

  try {
    await upsertLegenda(profileId, data, profile);
    await profileApi.update(profileId, {
      avatarUrl: data.photoUrl || DEFAULT_AVATAR_URL,
    });
    await replaceSocials(profileId, data.socials, profile.social || []);
    await replaceButtons(profileId, data.buttons);
  } catch (error) {
    logError("influencer.saveAll", error, { profileId });
    throw error;
  }
}

async function upsertLegenda(
  profileId: string,
  data: InfluencerTemplateData,
  profile: ProfileComplete,
) {
  const legenda = profile.legendas?.[0];
  const payload = {
    profileId,
    nome: data.name || "Seu Nome",
    titulo: data.themeId || "Criador de Conteudo",
    subtitulo: data.bio ? data.bio.substring(0, 255) : "",
    descricao: data.bio || "",
    legendaFoto: data.photoUrl || DEFAULT_AVATAR_URL,
  };

  if (legenda?.id) {
    await legendaApi.update(legenda.id, {
      nome: payload.nome,
      titulo: payload.titulo,
      subtitulo: payload.subtitulo,
      descricao: payload.descricao,
      legendaFoto: payload.legendaFoto,
    });
    return;
  }

  await legendaApi.create(payload);
}

async function replaceSocials(
  profileId: string,
  socials: InfluencerTemplateData["socials"],
  currentSocials: { id: string }[],
) {
  for (const social of currentSocials) {
    await socialApi.delete(social.id);
  }

  for (let i = 0; i < socials.length; i += 1) {
    const social = socials[i];
    if (!social.platform || !social.url) {
      continue;
    }

    await socialApi.create({
      profileId,
      plataforma: social.platform.toLowerCase() as any,
      url: social.url,
      ordem: i,
    });
  }
}

async function replaceButtons(
  profileId: string,
  buttons: InfluencerTemplateData["buttons"],
) {
  await linkButtonsApi.deleteAllByProfileId(profileId);

  const payload = buttons
    .filter((button) => button.label && button.url)
    .map((button, index) => ({
      label: button.label,
      url: button.url,
      subtext: button.subtext || "",
      icon: button.icon,
      style: button.style,
      ordem: index,
      ativo: true,
    }));

  if (payload.length) {
    await linkButtonsApi.upsertMany(profileId, payload);
  }
}
