import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

// GET /api/projects
export function useProjects(filters?: { category?: string; search?: string }) {
  const queryKey = [api.projects.list.path, filters?.category, filters?.search];
  
  return useQuery({
    queryKey,
    queryFn: async () => {
      // Build query string manually or use a helper if api.projects.list.input was strictly typed for query string conversion
      const params: Record<string, string> = {};
      if (filters?.category && filters.category !== 'Todos') params.category = filters.category;
      if (filters?.search) params.search = filters.search;
      
      const queryString = new URLSearchParams(params).toString();
      const url = `${api.projects.list.path}${queryString ? `?${queryString}` : ''}`;
      
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error('Error al cargar proyectos');
      return api.projects.list.responses[200].parse(await res.json());
    },
  });
}

// GET /api/projects/:id
export function useProject(id: number) {
  return useQuery({
    queryKey: [api.projects.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.projects.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error('Error al cargar proyecto');
      return api.projects.get.responses[200].parse(await res.json());
    },
  });
}
