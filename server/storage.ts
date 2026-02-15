import { db } from "./db";
import {
  projects,
  earnOpportunities,
  type Project,
  type InsertProject,
  type EarnOpportunity,
  type InsertEarn
} from "@shared/schema";
import { eq, ilike, or, and } from "drizzle-orm";

export interface IStorage {
  getProjects(search?: string, category?: string): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  getEarnOpportunities(type?: string): Promise<EarnOpportunity[]>;
  seedData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(search?: string, category?: string): Promise<Project[]> {
    let whereClause;
    if (search && category) {
      whereClause = and(
        or(
          ilike(projects.name, `%${search}%`),
          ilike(projects.token, `%${search}%`)
        ),
        eq(projects.category, category)
      );
    } else if (search) {
      whereClause = or(
        ilike(projects.name, `%${search}%`),
        ilike(projects.token, `%${search}%`)
      );
    } else if (category) {
      whereClause = eq(projects.category, category);
    } else {
      whereClause = undefined;
    }
    return await db.select().from(projects).where(whereClause);
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
          featured: false
          
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
          featured: false
          
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
          featured: false,
          referralUrl: "TU_LINK_AQUÍ"
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
          
        },
        {
          name: "Mysterium Network",
          slug: "mysterium",
          description: "Mercado descentralizado de ancho de banda para servicios VPN.",
          category: "Bandwidth",
          chain: "Polygon",
          token: "MYST",
          marketCap: "$15M",
          imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
          featured: true,
          referralUrl: "https://mystnodes.co/?referral_code=LSGpqME38ZmMGn02lYjrCJCK8dL7C2VoYjeEFEEd"
        },
        {
          name: "Soarchain",
          slug: "soarchain",
          description: "Red descentralizada para la conectividad y seguridad de vehículos en tiempo real.",
          category: "Mobility",
          chain: "Cosmos",
         token: "SOAR",
          marketCap: "$25M",          
          imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
          featured: false,
          referralUrl: "8b55674"
        },
         {
         name: "DIMO",
         slug: "dimo",
          description: "Plataforma que permite a los conductores recolectar y monetizar los datos de sus vehículos.",
         category: "Mobility",
          chain: "Polygon",
          token: "DIMO",
          marketCap: "$80M",
          imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
          featured: true,
          referralUrl: "onelink.to/dimo"
        },
        {
          name: "DeNet",
          slug: "denet",
          description: "Almacenamiento en la nube descentralizado enfocado en la privacidad y la soberanía de datos.",
          category: "Storage",
          chain: "Polygon",
          token: "DAT",
          marketCap: "$5M",
          imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
          featured: true,
          referralUrl: "https://links.denet.app/mobile?referrer=0x902a4130a53d7a2bb8b89900dbc4aff2d46c1075"
        },
        {
          name: "UpRock",
          slug: "uprock",
          description: "Red de datos impulsada por IA que utiliza el ancho de banda móvil no utilizado.",
          category: "AI",
          chain: "Solana",
          token: "UPT",
          marketCap: "$10M",
          imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
          featured: true,
          referralUrl: "https://link.uprock.com/i/9c7d0e54"
        },
        {
          name: "ROVR Network",
          slug: "rovr",
          description: "Infraestructura de conectividad inalámbrica para el ecosistema DePIN.",
          category: "Connectivity",
          chain: "Solana",
          token: "ROVR",
          marketCap: "$2M",
          imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
          featured: false,
          
        },
        {
          name: "Natix",
          slug: "natix",
          description: "Red de mapas impulsada por IA mediante cámaras y visión computacional descentralizada.",
          category: "Sensors",
          chain: "Solana",
          token: "NATIX",
          marketCap: "$20M",
          imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
          featured: true,
          referralUrl: "https://drive.natix.network/app-open?unlockCode=sCDT+Fjzn7"
        },
        {
          name: "Honeygain",
          slug: "honeygain",
          description: "La plataforma pionera para compartir tu ancho de banda sobrante a cambio de ingresos pasivos.",
          category: "Bandwidth",
          chain: "Multi-chain (via JumpTask)",
          token: "HG / Credits",
          marketCap: "Private",
          imageUrl: "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80",
          featured: true,
          referralUrl: "https://join.honeygain.com/GLOBAFCEA4"
        },
        {
          name: "JumpTask",
          slug: "jumptask",
          description: "Microtareas y potencia las ganancias de Honeygain con un bono del 10%.",
          category: "Rewards",
          chain: "BSC / Polygon",
          token: "JMPT",
          marketCap: "$12M",
          imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
          featured: false,
          referralUrl: "https://www.jumptask.io/r/futivowewyze"
        },
        {
          name: "ByteLixir",
          slug: "bytelixir",
          description: "Compartir tu ancho de banda para ganar.",
          category: "Storage",
          chain: "Polygon",
          token: "BYTEX",
          marketCap: "$10M",
          imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
          featured: false,
          referralUrl: "https://bytelixir.com/r/XUNCISLHUFT0"
        },
        {
          name: "Grass",
          slug: "grass",
          description: "Grass es una plataforma de almacenamiento en la nube descentralizado que te permite almacenar tus datos de forma segura y privada.",
          category: "Storage",
          chain: "Solana",
          token: "GRASS",
          marketCap: "$10M",
          imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
          featured: false,
          referralUrl: "https://app.grass.io/register?referralCode=8djPmjmVufVUKOH"
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
          type: "Mining de hardware",
          estimatedEarnings: "$2-5 / día",
          hardwareCost: "$249",
          roi: "150 días",
          difficulty: "Fácil"
        },
        {
          projectName: "Hivemapper Dashcam",
          category: "Sensors",
          type: "Conducir para ganar",
          estimatedEarnings: "$10-30 / mes",
          hardwareCost: "450€",
          roi: "270 días",
          difficulty: "Fácil"
        },
        {
          projectName: "Render Node",
          category: "Compute",
          type: "GPU Mining",
          estimatedEarnings: "Variable",
          hardwareCost: "PC Gamer existente",
          roi: "N/A",
          difficulty: "Medio"
        },
        {
          projectName: "Grass",
          category: "Bandwidth",
          type: "Browser Extension",
          estimatedEarnings: "Puntos (Airdrop)",
          hardwareCost: "$0",
          roi: "N/A",
          difficulty: "Fácil"
        },
        {
          projectName: "Mysterium Network",
          category: "Wireless",
          type: "Transferencia de Datos B2B / VPN",
          estimatedEarnings: "30-180 $MYST / mes",
          hardwareCost: "App/ Programa",
          roi: "1 día",
          difficulty: "Fácil",
          // deviceRequired: true (Si quieres añadir esta línea en tu interfaz)
        },
        {
          projectName: "Soarchain",
          category: "Mobility",
          type: "Drive to Earn",
          estimatedEarnings: " 1500 $SOAR / mes",
          hardwareCost: "49€ (MINI)",
          roi: "300 días",
          difficulty: "Medio"
        },
        {
          projectName: "DIMO",
          category: "Mobility",
          type: "Monetization de tu vehículo",
          estimatedEarnings: "34.16 - 409.52 $DIMO  / mes",
          hardwareCost: "0€ - 299€", // Software es gratis, hardware cuesta
          roi: "180 días",
          difficulty: "Fácil"
        },
        {
          projectName: "DeNet",
          category: "Storage",
          type: "Almacenamiento Descentralizado",
          estimatedEarnings: " x / mes",
          hardwareCost: "Telefóno / PC + HDD",
          roi: "N/A, TGE Q1 2026",
          difficulty: "Fácil"
        },
        {
          projectName: "UpRock",
          category: "AI Data",
          type: "App / Programa",
          estimatedEarnings: "5-15€ / mes",
          hardwareCost: "Móvil / PC",
          roi: "N/A",
          difficulty: "Fácil"
        },
        {
          projectName: "ROVR Network",
          category: "Drive to Earn",
          type: "Coverage Mining",
          estimatedEarnings: "1-3€ / día",
          hardwareCost: "$150-300",
          roi: "150 días",
          difficulty: "Fácil"
        },
        {
          projectName: "Natix",
          category: "Drive to Earn",
          type: "Coverage Mining",
          estimatedEarnings: "3-300€ / mes",
          hardwareCost: "€0-350",
          roi: "1-180 días",
          difficulty: "Fácil"
        },
      ];

      for (const e of demoEarn) {
        await db.insert(earnOpportunities).values(e);
      }
    }
  }
}

export const storage = new DatabaseStorage();
