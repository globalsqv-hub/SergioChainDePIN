import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

// GET /api/earn
export function useEarnOpportunities(filters?: { type?: string }) {
  const queryKey = [api.earn.list.path, filters?.type];
  
  return useQuery({
    queryKey,
    queryFn: async () => {
      const params: Record<string, string> = {};
      if (filters?.type && filters.type !== 'Todos') params.type = filters.type;
      
      const queryString = new URLSearchParams(params).toString();
      const url = `${api.earn.list.path}${queryString ? `?${queryString}` : ''}`;
      
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error('Error al cargar oportunidades');
      return api.earn.list.responses[200].parse(await res.json());
    },
  });
}
