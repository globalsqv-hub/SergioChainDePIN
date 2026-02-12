import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed data on startup
  await storage.seedData();

  app.get(api.projects.list.path, async (req, res) => {
    const search = req.query.search as string | undefined;
    const category = req.query.category as string | undefined;
    const projects = await storage.getProjects(search, category);
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const id = Number(req.params.id);
    const project = await storage.getProject(id);
    if (!project) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }
    res.json(project);
  });

  app.get(api.earn.list.path, async (req, res) => {
    const type = req.query.type as string | undefined;
    const opportunities = await storage.getEarnOpportunities(type);
    res.json(opportunities);
  });

  return httpServer;
}
