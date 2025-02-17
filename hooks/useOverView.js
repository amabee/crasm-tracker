import { useQuery } from "@tanstack/react-query";

export function useOverview() {
  return useQuery({
    queryKey: ['overview'],
    queryFn: async () => {
      const response = await fetch('/api/admin/overview');
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      const data = await response.json();
      return {
        total_applications: Number(data.total_applications),
        pending_applications: Number(data.pending_applications),
        recent_applications: data.recent_applications
      };
    },
    refetchInterval: 2 * 60 * 1000,
  });
}
