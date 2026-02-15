import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

/** Mapea categorías en español (UI) a inglés (base de datos) */
const CATEGORY_MAP: Record<string, string> = {
  Todos: "",
  Sensores: "Sensors",
  Computación: "Compute",
  WiFi: "Wireless",
  Almacenamiento: "Storage",
  IA: "AI",
  "Ancho de banda": "Bandwidth",
  Movilidad: "Mobility",
  Conectividad: "Connectivity",
  Recompensas: "Rewards",
};

// GET /api/projects
export function useProjects(filters?: { category?: string; search?: string }) {
  const queryKey = [api.projects.list.path, filters?.category, filters?.search];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const params: Record<string, string> = {};
      const dbCategory = filters?.category ? CATEGORY_MAP[filters.category] ?? filters.category : "";
      if (dbCategory) params.category = dbCategory;
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
