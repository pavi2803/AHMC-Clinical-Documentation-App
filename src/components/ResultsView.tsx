import { Copy, Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ResultsViewProps {
  revisedNotes: string;
  missingCriteria: string;
  onNewAnalysis: () => void;
}

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
      {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied" : "Copy"}
    </Button>
  );
};

const ResultsView = ({ revisedNotes, missingCriteria, onNewAnalysis }: ResultsViewProps) => (
  <div className="max-w-7xl mx-auto p-6 space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold text-foreground">Analysis Results</h2>
      <Button variant="outline" onClick={onNewAnalysis} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        New Analysis
      </Button>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel: Revised Notes */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="bg-primary/5 border-b border-border px-5 py-3 flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Revised Clinical Notes</h3>
          <CopyButton text={revisedNotes} />
        </div>
        <div className="p-5">
          <pre className="whitespace-pre-wrap text-sm text-foreground font-sans leading-relaxed">
            {revisedNotes}
          </pre>
        </div>
      </div>

      {/* Right Panel: Missing Criteria */}
      <div className="bg-card border border-destructive/30 rounded-lg overflow-hidden">
        <div className="bg-destructive/5 border-b border-destructive/20 px-5 py-3 flex items-center justify-between">
          <h3 className="font-semibold text-destructive">Missing Criteria</h3>
          <CopyButton text={missingCriteria} />
        </div>
        <div className="p-5">
          <pre className="whitespace-pre-wrap text-sm text-foreground font-sans leading-relaxed">
            {missingCriteria}
          </pre>
        </div>
      </div>
    </div>
  </div>
);

export default ResultsView;
