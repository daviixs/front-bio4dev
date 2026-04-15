import { profileApi } from '@/lib/api';

export const MAX_PORTFOLIOS = 3;
export const PROFILE_LIMIT_MESSAGE =
  'Limite atingido: você pode ter no máximo 3 portfolios. Exclua um para criar outro.';

export async function hasReachedProfileLimit(userId: string): Promise<boolean> {
  const profiles = await profileApi.getByUserId(userId);
  return profiles.length >= MAX_PORTFOLIOS;
}
