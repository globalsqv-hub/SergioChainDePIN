import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="glass-panel p-12 rounded-2xl text-center max-w-md w-full border border-primary/20 shadow-[0_0_50px_rgba(0,240,255,0.1)]">
        <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-destructive/20 animate-pulse">
          <AlertTriangle className="w-10 h-10 text-destructive" />
        </div>
        
        <h1 className="text-4xl font-display font-bold mb-2">404</h1>
        <p className="text-xl font-medium text-white mb-6">Página no encontrada</p>
        <p className="text-muted-foreground mb-8">
          La señal se ha perdido en el ciberespacio. La página que buscas no existe o ha sido movida.
        </p>

        <Link href="/">
          <Button className="w-full bg-primary text-background hover:bg-primary/90 font-bold">
            Volver al Inicio
          </Button>
        </Link>
      </div>
    </div>
  );
}
