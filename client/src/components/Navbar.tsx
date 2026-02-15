import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import logo from "@assets/logo1_1770920301492.png";
import { Cpu, Zap, Activity, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Proyectos", path: "/projects", icon: Cpu },
    { name: "Ganar", path: "/earn", icon: Zap },
    { name: "Comunidad", path: "/community", icon: Activity },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-primary/20 group-hover:border-primary/50 transition-colors">
              <img src={logo} alt="SergioChain DePIN" className="h-full w-full object-contain" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-white">
              Sergio<span className="text-secondary">Chain</span> DePIN
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-all hover:text-primary",
                  location === item.path || (item.path === '/projects' && location === '/')
                    ? "text-primary text-glow"
                    : "text-muted-foreground"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-muted-foreground hover:text-white"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/5 bg-background/95 backdrop-blur-xl">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  location === item.path 
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
