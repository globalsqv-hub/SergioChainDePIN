import { useParams, Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { useProject } from "@/hooks/use-projects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Cpu, ExternalLink, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectDetail() {
  const params = useParams<{ id: string }>();
  const id = params?.id ? parseInt(params.id, 10) : NaN;
  const { data: project, isLoading, isError } = useProject(id);

  const invalidId = isNaN(id);
  const showError = invalidId || isError || (!isLoading && !project);

  if (showError) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">Proyecto no encontrado</h1>
          <Link href="/projects">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver a Proyectos
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">Cargando proyecto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <Link href="/projects">
          <Button variant="ghost" className="mb-8 gap-2 text-muted-foreground hover:text-white">
            <ArrowLeft className="w-4 h-4" />
            Volver a Proyectos
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-panel rounded-2xl overflow-hidden"
        >
          {/* Imagen de cabecera */}
          <div className="h-64 md:h-80 w-full overflow-hidden bg-muted relative">
            <img
              src={project.imageUrl}
              alt={project.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-xl bg-background/60 backdrop-blur-md border border-white/10 p-3 flex items-center justify-center">
                  <Cpu className="text-primary w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
                    {project.name}
                  </h1>
                  <p className="text-primary text-lg font-mono mt-1">{project.token}</p>
                  {project.featured && (
                    <Badge className="mt-2 bg-primary text-primary-foreground border-none">
                      Destacado
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge variant="outline" className="border-primary/30 text-primary">
                {project.category}
              </Badge>
              <Badge variant="outline" className="border-white/20 text-muted-foreground">
                {project.chain}
              </Badge>
              {project.marketCap && (
                <Badge variant="outline" className="border-secondary/30 text-secondary">
                  {project.marketCap}
                </Badge>
              )}
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {project.description}
            </p>

            {project.referralUrl && (
              <a
                href={project.referralUrl.startsWith("http") ? project.referralUrl : `https://${project.referralUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 transition-colors font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                Ir al proyecto / Usar enlace de referido
              </a>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
