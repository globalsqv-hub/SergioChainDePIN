import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { EarnRow } from "@/components/EarnRow";
import { useEarnOpportunities } from "@/hooks/use-earn";
import { Loader2, Zap } from "lucide-react";
import { motion } from "framer-motion";

const FILTERS = ["Todos", "Minería Hardware", "App Móvil", "Validación", "Staking"];

export default function Earn() {
  const [filter, setFilter] = useState("Todos");
  const { data: opportunities, isLoading, isError } = useEarnOpportunities({ type: filter });

  return (
    <div className="min-h-screen pb-20">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-secondary/10 border border-secondary/20">
                <Zap className="w-6 h-6 text-secondary" />
              </div>
              <h2 className="text-secondary font-mono text-sm tracking-widest uppercase">Oportunidades de Ingresos</h2>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              Maximiza tus <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Ganancias</span>
            </h1>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 border-b border-white/5">
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
            {FILTERS.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`
                  pb-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-300
                  ${filter === item 
                    ? 'border-secondary text-secondary text-glow' 
                    : 'border-transparent text-muted-foreground hover:text-white'}
                `}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* List Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-secondary animate-spin mb-4" />
            <p className="text-muted-foreground animate-pulse">Buscando oportunidades...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-20 text-destructive">
            <p>Error al cargar las oportunidades.</p>
          </div>
        ) : opportunities?.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No hay oportunidades disponibles en esta categoría.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {opportunities?.map((opp) => (
              <EarnRow key={opp.id} opportunity={opp} />
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}
