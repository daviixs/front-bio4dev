import { useState, useEffect } from "react";
import { PortfolioService } from "../services/api/portfolio.service";
import { PortfolioData } from "../services/api/types";

interface UsePortfolioOptions {
  slug: string;
  previewToken?: string;
}

interface UsePortfolioReturn {
  data: PortfolioData | null;
  loading: boolean;
  error: string | null;
}

export function usePortfolio({
  slug,
  previewToken,
}: UsePortfolioOptions): UsePortfolioReturn {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchPortfolio() {
      try {
        setLoading(true);
        setError(null);

        const portfolio = await PortfolioService.getBySlug(slug, previewToken);

        if (isMounted) {
          setData(portfolio);
        }
      } catch (err) {
        if (isMounted) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("UNKNOWN_ERROR");
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchPortfolio();

    return () => {
      isMounted = false;
    };
  }, [slug, previewToken]);

  return { data, loading, error };
}
