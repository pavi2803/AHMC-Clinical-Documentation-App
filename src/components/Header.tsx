import { FileText } from "lucide-react";

const Header = () => (
  <header className="bg-primary text-primary-foreground px-6 py-4 shadow-md">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-3">
        <FileText className="h-7 w-7 text-accent" />
        <div>
          <h1 className="text-xl font-bold tracking-tight">HPI ClinDoc AI</h1>
          <p className="text-xs text-primary-foreground/70 font-medium">Clinical Documentation Optimization</p>
        </div>
      </div>
      <div className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-md px-3 py-1.5">
        <span className="text-sm font-semibold tracking-wide">AHMC Health</span>
      </div>
    </div>
  </header>
);

export default Header;
