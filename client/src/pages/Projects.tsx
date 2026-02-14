import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
import { useProjects } from "@/hooks/use-projects";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const CATEGORIES = ["Todos", "Sensores", "Computación", "WiFi", "Almacenamiento", "IA"];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: projects, isLoading, isError } = useProjects({
    category: selectedCategory,
    search: searchTerm
  });

  return (
    <div className="min-h-screen pb-20">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Header Section */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 tracking-tight">
            Explora el <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-glow">Futuro</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Descubre los proyectos de infraestructura física descentralizada (DePIN) más innovadores y únete a la revolución.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="glass-panel p-4 rounded-2xl mb-10 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-20 z-40 shadow-xl">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200
                  ${selectedCategory === cat 
                    ? 'bg-primary text-background shadow-[0_0_15px_rgba(0,240,255,0.4)]' 
                    : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar proyecto..." 
                className="pl-10 bg-black/40 border-white/10 focus:border-primary/50 text-white placeholder:text-muted-foreground/50 rounded-xl pointer-events-none opacity-80"
                value={searchTerm}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Grid Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground animate-pulse">Cargando la red...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-20 text-destructive">
            <p>Error al cargar los datos. Por favor intenta de nuevo.</p>
          </div>
        ) : projects?.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No se encontraron proyectos.</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}
