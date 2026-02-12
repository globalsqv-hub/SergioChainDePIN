import { pgTable, text, serial, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Tabla de Proyectos (como en depinhub.io/projects)
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // e.g., "Sensors", "Compute", "WiFi"
  chain: text("chain").notNull(), // e.g., "Solana", "Ethereum"
  token: text("token").notNull(),
  marketCap: text("market_cap"), // e.g., "$50M"
  imageUrl: text("image_url").notNull(),
  featured: boolean("featured").default(false),
});

// Tabla de Oportunidades de Ganancia (como en depinhub.io/earn)
export const earnOpportunities = pgTable("earn_opportunities", {
  id: serial("id").primaryKey(),
  projectName: text("project_name").notNull(),
  category: text("category").notNull(),
  type: text("type").notNull(), // e.g., "Hardware Mining", "Mobile App"
  estimatedEarnings: text("estimated_earnings").notNull(), // e.g., "$5/day"
  hardwareCost: text("hardware_cost"), // e.g., "$300"
  roi: text("roi"), // e.g., "120 Days"
  difficulty: text("difficulty").notNull(), // "Low", "Medium", "High"
});

export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });
export const insertEarnSchema = createInsertSchema(earnOpportunities).omit({ id: true });

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type EarnOpportunity = typeof earnOpportunities.$inferSelect;
export type InsertEarn = z.infer<typeof insertEarnSchema>;
