import { useEffect, useState, useCallback, useRef } from "react";
import { analyticsApi, profileApi } from "@/lib/api";
import type {
  OverviewResponse,
  TimeseriesPoint,
  TopPage,
  DeviceBreakdown,
  Profile,
} from "@/types";

interface DataState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  empty: boolean;
  refetch: () => void;
}

const getErrorMessage = (err: any) => {
  if (err?.response?.data?.message) return err.response.data.message;
  if (err?.message === "Network Error")
    return "Não foi possível conectar ao servidor";
  return err?.message || "Erro ao buscar dados";
};

export const useProfilesByUser = (userId?: string): DataState<Profile[]> => {
  const abortRef = useRef<AbortController | null>(null);
  const [state, setState] = useState<DataState<Profile[]>>({
    data: null,
    loading: !!userId,
    error: null,
    empty: false,
    refetch: () => {},
  });

  const fetchData = useCallback(() => {
    if (!userId) {
      setState((prev) => ({ ...prev, loading: false, data: null, empty: true }));
      return;
    }
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    profileApi
      .getAll()
      .then((profiles) => {
        const filtered = profiles.filter((p) => p.userId === userId);
        setState((prev) => ({
          ...prev,
          data: filtered,
          empty: filtered.length === 0,
          loading: false,
        }));
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        setState((prev) => ({
          ...prev,
          error: getErrorMessage(err),
          loading: false,
        }));
      });
  }, [userId]);

  useEffect(() => {
    fetchData();
    return () => abortRef.current?.abort();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
};

const useAnalyticsFetcher = <T,>(
  fetcher: () => Promise<T>,
  deps: any[] = [],
): DataState<T> => {
  const abortRef = useRef<AbortController | null>(null);
  const [state, setState] = useState<DataState<T>>({
    data: null,
    loading: true,
    error: null,
    empty: false,
    refetch: () => {},
  });

  const load = useCallback(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    fetcher()
      .then((data) => {
        setState((prev) => ({
          ...prev,
          data,
          empty: Array.isArray(data) ? data.length === 0 : !data,
          loading: false,
        }));
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        setState((prev) => ({
          ...prev,
          error: getErrorMessage(err),
          loading: false,
        }));
      });
  }, deps);

  useEffect(() => {
    load();
    return () => abortRef.current?.abort();
  }, [load]);

  return { ...state, refetch: load };
};

export const useOverviewData = (
  profileId?: string,
  range: string = "last30d",
): DataState<OverviewResponse> =>
  useAnalyticsFetcher<OverviewResponse>(
    async () => {
      if (!profileId) throw new Error("Perfil não encontrado");
      const data = await analyticsApi.getOverview(profileId, range);
      return data;
    },
    [profileId, range],
  );

export const useTimeseriesData = (
  profileId?: string,
  interval: "day" | "month" = "day",
  range: string = "last90d",
): DataState<TimeseriesPoint[]> =>
  useAnalyticsFetcher<TimeseriesPoint[]>(
    async () => {
      if (!profileId) throw new Error("Perfil não encontrado");
      const data = await analyticsApi.getTimeseries(profileId, interval, range);
      return data;
    },
    [profileId, interval, range],
  );

export const useTopPagesData = (
  profileId?: string,
  limit = 5,
  range: string = "last30d",
): DataState<TopPage[]> =>
  useAnalyticsFetcher<TopPage[]>(
    async () => {
      if (!profileId) throw new Error("Perfil não encontrado");
      const data = await analyticsApi.getTopPages(profileId, limit, range);
      return data;
    },
    [profileId, limit, range],
  );

export const useDevicesData = (
  profileId?: string,
  range: string = "last30d",
): DataState<DeviceBreakdown[]> =>
  useAnalyticsFetcher<DeviceBreakdown[]>(
    async () => {
      if (!profileId) throw new Error("Perfil não encontrado");
      const data = await analyticsApi.getDevices(profileId, range);
      return data;
    },
    [profileId, range],
  );
