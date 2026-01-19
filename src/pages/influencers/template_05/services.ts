import type { ProfileComplete } from "@/types";
import type { InfluencerTemplateData } from "./types";
import { TEMPLATE_ID } from "./types";
import { load as loadShared, saveAll as saveAllShared } from "../shared/services";

/**
 * Example: load(profileId)
 * Request: GET /profile/:id/complete
 * Response: { "id": "profile-id", "templateType": "template_05" }
 */
export async function load(profileId: string) {
  return loadShared(profileId, TEMPLATE_ID);
}

/**
 * Example: saveAll(profileId, data)
 * Request: POST /legenda, POST /social, PUT /link-buttons/profile/:profileId
 * Response: { "message": "ok" }
 */
export async function saveAll(
  profileId: string,
  data: InfluencerTemplateData,
  currentProfile?: ProfileComplete,
) {
  return saveAllShared(profileId, data, currentProfile);
}
