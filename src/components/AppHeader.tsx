import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const AppHeader = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 h-20 px-6 flex items-center justify-between shadow-lg border-b-2 border-accent"
      style={{ background: "var(--header-gradient)" }}>
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <span className="font-display text-primary-foreground text-lg font-bold tracking-wide">VVG</span>
        </div>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 text-center">
        <h1 className="font-display text-accent text-lg font-bold tracking-wide drop-shadow-lg">
          Attendance Management System
        </h1>
        <p className="text-foreground/70 text-xs tracking-[3px] uppercase">Victory Vocals Ghana</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-foreground/80 text-sm hidden sm:inline">{user?.email}</span>
        <Button variant="outline" size="sm" onClick={signOut}
          className="border-foreground/20 text-foreground hover:bg-foreground/10">
          <LogOut className="w-4 h-4 mr-1" /> Logout
        </Button>
      </div>
    </header>
  );
};

export default AppHeader;
