import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import victoryLogo from "@/assets/victory_logo.jpeg";

const AppHeader = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 shadow-sm border-b border-border bg-primary">
      {/* Top row */}
      <div className="h-16 md:h-20 px-4 md:px-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={victoryLogo}
            alt="Victory Vocals Ghana"
            className="h-10 md:h-12 object-contain shrink-0"
          />
          {/* Title inline on md+ screens */}
          <div className="hidden md:block">
            <h1 className="font-display text-primary-foreground text-lg font-bold tracking-wide leading-tight">
              Attendance Management System
            </h1>
            <p className="text-primary-foreground/70 text-[11px] tracking-[3px] uppercase">
              Victory Vocals Ghana
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <span className="text-primary-foreground/80 text-sm hidden lg:inline truncate max-w-[200px]">
            {user?.email}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={signOut}
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
          >
            <LogOut className="w-4 h-4 md:mr-1" />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </div>
      </div>

      {/* Title stacked on mobile */}
      <div className="md:hidden px-4 pb-3 -mt-1 text-center">
        <h1 className="font-display text-primary-foreground text-base font-bold tracking-wide leading-tight">
          Attendance Management System
        </h1>
        <p className="text-primary-foreground/70 text-[10px] tracking-[2px] uppercase mt-0.5">
          Victory Vocals Ghana
        </p>
      </div>
    </header>
  );
};

export default AppHeader;
