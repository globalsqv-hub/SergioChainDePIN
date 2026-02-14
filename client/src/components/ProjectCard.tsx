import { Project } from "@shared/schema";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Cpu, Link as LinkIcon } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`} className="group block h-full">
      <div className="h-full glass-panel rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] hover:border-primary/50 relative flex flex-col">
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Featured Tag */}
        {project.featured && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-primary text-primary-foreground border-none font-bold uppercase tracking-wider text-[10px] shadow-[0_0_10px_rgba(0,240,255,0.4)]">
              Destacado
            </Badge>
          </div>
        )}

        {/* Image Area */}
        <div className="h-48 w-full overflow-hidden bg-muted relative">
          <img 
            src={project.imageUrl} 
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
          
          <div className="absolute bottom-4 left-4 flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-background/50 backdrop-blur-md border border-white/10 p-2 flex items-center justify-center shadow-lg">
              <Cpu className="text-primary w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white leading-none font-display">{project.name}</h3>
              <p className="text-primary text-sm font-medium mt-1">{project.token}</p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5 flex flex-col flex-grow">
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {project.description}
          </p>

          <div className="mt-auto space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/5 rounded-md p-2 border border-white/5">
                <span className="text-muted-foreground block mb-0.5">Cadena</span>
                <span className="text-white font-mono">{project.chain}</span>
              </div>
              <div className="bg-white/5 rounded-md p-2 border border-white/5">
                <span className="text-muted-foreground block mb-0.5">Mkt Cap</span>
                <span className="text-secondary font-mono">{project.marketCap || 'N/A'}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <Badge variant="outline" className="border-white/10 text-muted-foreground hover:bg-white/5 hover:text-white transition-colors">
                {project.category}
              </Badge>
              <span className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                Ver Detalles <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
