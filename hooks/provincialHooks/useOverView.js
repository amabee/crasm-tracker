import { useQuery } from "@tanstack/react-query";

export function useOverview(province_id = null) {
  return useQuery({
    queryKey: ["overview", province_id],
    queryFn: async () => {
      const url = new URL("/api/cashier/overview", window.location.origin);
      if (province_id) {
        url.searchParams.append("province_id", province_id);
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const data = await response.json();
      return {
        total_applications: Number(data.total_applications),
        pending_applications: Number(data.pending_applications),
        recent_applications: data.recent_applications,
        monthly_applications: data.monthly_applications,
      };
    },
    refetchInterval: 2 * 60 * 1000,
  });
}
