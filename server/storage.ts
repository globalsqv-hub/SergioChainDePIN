import { db } from "./db";
import {
  projects,
  earnOpportunities,
  type Project,
  type InsertProject,
  type EarnOpportunity,
  type InsertEarn
} from "@shared/schema";
import { eq, ilike, or } from "drizzle-orm";

export interface IStorage {
  getProjects(search?: string, category?: string): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  getEarnOpportunities(type?: string): Promise<EarnOpportunity[]>;
  seedData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(search?: string, category?: string): Promise<Project[]> {
    let query = db.select().from(projects);
    
    if (search) {
      // Simple search implementation
      return await db.select().from(projects).where(
        or(
          ilike(projects.name, `%${search}%`),
          ilike(projects.token, `%${search}%`)
        )
      );
    }
    
    return await query;
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async getEarnOpportunities(type?: string): Promise<EarnOpportunity[]> {
    if (type) {
      return await db.select().from(earnOpportunities).where(eq(earnOpportunities.type, type));
    }
    return await db.select().from(earnOpportunities);
  }

  async seedData(): Promise<void> {
    const existingProjects = await this.getProjects();
    if (existingProjects.length === 0) {
      // Seed Projects
      const demoProjects: InsertProject[] = [
        {
          name: "Helium",
          slug: "helium",
          description: "Red inalámbrica descentralizada impulsada por criptomonedas.",
          category: "Wireless",
          chain: "Solana",
          token: "HNT",
          marketCap: "$800M",
          imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
          featured: true
        },
        {
          name: "Filecoin",
          slug: "filecoin",
          description: "Sistema de almacenamiento descentralizado para guardar la información más importante de la humanidad.",
          category: "Storage",
          chain: "Filecoin",
          token: "FIL",
          marketCap: "$2.1B",
          imageUrl: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?w=800&q=80",
          featured: true
        },
        {
          name: "Hivemapper",
          slug: "hivemapper",
          description: "Construye un mejor mapa del mundo y gana criptomonedas con una dashcam.",
          category: "Sensors",
          chain: "Solana",
          token: "HONEY",
          marketCap: "$120M",
          imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
          featured: true
        },
        {
          name: "Render Network",
          slug: "render",
          description: "Renderizado de GPU distribuido en la blockchain.",
          category: "Compute",
          chain: "Solana",
          token: "RNDR",
          marketCap: "$3.5B",
          imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
          featured: true
        },
        {
          name: "Theta Network",
          slug: "theta",
          description: "Infraestructura de video y entretenimiento impulsada por blockchain.",
          category: "Bandwidth",
          chain: "Theta",
          token: "THETA",
          marketCap: "$1.8B",
          imageUrl: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800&q=80",
          featured: false
        }
      ];

      for (const p of demoProjects) {
        await db.insert(projects).values(p);
      }

      // Seed Earn Opportunities
      const demoEarn: InsertEarn[] = [
        {
          projectName: "Helium Mobile",
          category: "Wireless",
          type: "Hardware Mining",
          estimatedEarnings: "$2-5 / día",
          hardwareCost: "$249",
          roi: "150 días",
          difficulty: "Low"
        },
        {
          projectName: "Hivemapper Dashcam",
          category: "Sensors",
          type: "Drive to Earn",
          estimatedEarnings: "$100-300 / mes",
          hardwareCost: "$299",
          roi: "90 días",
          difficulty: "Medium"
        },
        {
          projectName: "Render Node",
          category: "Compute",
          type: "GPU Mining",
          estimatedEarnings: "Variable",
          hardwareCost: "PC Gamer existente",
          roi: "N/A",
          difficulty: "High"
        },
        {
          projectName: "Grass",
          category: "Bandwidth",
          type: "Browser Extension",
          estimatedEarnings: "Puntos (Airdrop)",
          hardwareCost: "$0",
          roi: "N/A",
          difficulty: "Low"
        }
      ];

      for (const e of demoEarn) {
        await db.insert(earnOpportunities).values(e);
      }
    }
  }
}

export const storage = new DatabaseStorage();
