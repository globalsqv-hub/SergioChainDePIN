import { EarnOpportunity } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign, TrendingUp, Clock } from "lucide-react";

interface EarnRowProps {
  opportunity: EarnOpportunity;
}

export function EarnRow({ opportunity }: EarnRowProps) {
  return (
    <div className="group glass-panel rounded-xl p-4 sm:p-6 mb-4 transition-all duration-200 hover:bg-card/80 hover:border-primary/30 flex flex-col sm:flex-row items-start sm:items-center gap-6">
      
      {/* Icon/Logo */}
      <div className="flex-shrink-0">
        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 border border-white/10 flex items-center justify-center">
          <DollarSign className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Main Info */}
      <div className="flex-grow min-w-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        <div>
          <h3 className="text-lg font-bold text-white font-display truncate">{opportunity.projectName}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20 border-none h-5 text-[10px] px-1.5 uppercase tracking-wider">
              {opportunity.difficulty}
            </Badge>
            <span className="text-xs text-muted-foreground">{opportunity.type}</span>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Ganancias Est.
          </span>
          <span className="text-primary font-mono font-bold text-lg">{opportunity.estimatedEarnings}</span>
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1">
            <Clock className="w-3 h-3" /> ROI
          </span>
          <span className="text-white font-mono font-medium">{opportunity.roi || 'Variable'}</span>
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Costo Hardware</span>
          <span className="text-white font-mono font-medium">{opportunity.hardwareCost || 'Gratis'}</span>
        </div>
      </div>

      {/* Info labels */}
      <div className="mt-4 sm:mt-0 w-full sm:w-auto flex-shrink-0 text-right">
        <span className="text-xs text-muted-foreground italic">Información del Proyecto</span>
      </div>
    </div>
  );
}
