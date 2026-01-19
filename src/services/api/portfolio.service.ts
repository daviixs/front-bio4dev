import { PortfolioData, PortfolioListItem, PreviewToken } from "./types";

// Vite usa import.meta.env ao invés de process.env
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export class PortfolioService {
  /**
   * Busca portfolio público por slug
   * @param slug - Slug único do portfolio
   * @param previewToken - Token opcional para preview de portfolios não publicados
   */
  static async getBySlug(
    slug: string,
    previewToken?: string,
  ): Promise<PortfolioData> {
    const url = new URL(`${API_BASE_URL}/profile/slug/${slug}`);
    if (previewToken) {
      url.searchParams.append("preview", previewToken);
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Next.js 13+: sempre buscar dados frescos
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("PORTFOLIO_NOT_FOUND");
      }
      if (response.status === 403) {
        throw new Error("PORTFOLIO_NOT_PUBLISHED");
      }
      if (response.status === 401) {
        throw new Error("INVALID_PREVIEW_TOKEN");
      }
      throw new Error("API_ERROR");
    }

    return response.json();
  }

  /**
   * Lista portfolios do usuário (para dashboard admin)
   * @param userId - ID do usuário
   */
  static async listByUserId(userId: string): Promise<PortfolioListItem[]> {
    const response = await fetch(`${API_BASE_URL}/profile/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("FAILED_TO_FETCH_PORTFOLIOS");
    }

    return response.json();
  }

  /**
   * Gera token de preview para portfolio não publicado
   * @param profileId - ID do portfolio
   */
  static async generatePreviewToken(profileId: string): Promise<PreviewToken> {
    const response = await fetch(
      `${API_BASE_URL}/profile/${profileId}/preview-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("FAILED_TO_GENERATE_TOKEN");
    }

    return response.json();
  }
}
