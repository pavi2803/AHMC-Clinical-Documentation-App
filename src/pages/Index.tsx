import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Loader2, FileText, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import SectionChecklist from "@/components/SectionChecklist";
import ResultsView from "@/components/ResultsView";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [notes, setNotes] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [revisedNotes, setRevisedNotes] = useState("");
  const [missingCriteria, setMissingCriteria] = useState("");
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type === "application/pdf") {
      setPdfFile(file);
    } else {
      toast({ title: "Invalid file", description: "Please upload a PDF file.", variant: "destructive" });
    }
  }, [toast]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type === "application/pdf") {
      setPdfFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (!notes.trim()) {
      toast({ title: "Notes required", description: "Please paste your clinical notes.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-notes", {
        body: { notes: notes.trim() },
      });

      if (error) throw error;

      const response = data.result || "";
      const revisedMatch = response.split("===REVISED NOTES===");
      const missingMatch = response.split("===MISSING CRITERIA===");

      let revised = "";
      let missing = "";

      if (revisedMatch.length > 1 && missingMatch.length > 1) {
        revised = response.split("===REVISED NOTES===")[1]?.split("===MISSING CRITERIA===")[0]?.trim() || "";
        missing = response.split("===MISSING CRITERIA===")[1]?.trim() || "";
      } else {
        revised = response;
        missing = "Unable to parse missing criteria section.";
      }

      setRevisedNotes(revised);
      setMissingCriteria(missing);
      setShowResults(true);
    } catch (err) {
      console.error(err);
      toast({ title: "Analysis failed", description: "Could not process notes. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <ResultsView
          revisedNotes={revisedNotes}
          missingCriteria={missingCriteria}
          onNewAnalysis={() => {
            setShowResults(false);
            setRevisedNotes("");
            setMissingCriteria("");
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="text-center space-y-1 mb-8">
          <h2 className="text-2xl font-bold text-foreground">Clinical Documentation Optimizer</h2>
          <p className="text-muted-foreground">Paste notes below and upload MCG guidelines to optimize for insurance compliance.</p>
        </div>

        {/* Clinical Notes Input */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Clinical Notes</label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Paste all clinical notes here — H&P, labs, vitals, imaging, etc."
            className="min-h-[280px] font-mono text-sm resize-y bg-card"
          />
        </div>

        {/* Section Checklist */}
        <SectionChecklist text={notes} />

        {/* PDF Upload */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">MCG Guideline PDF (optional)</label>
          {pdfFile ? (
            <div className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3">
              <FileText className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium text-foreground flex-1">{pdfFile.name}</span>
              <Button variant="ghost" size="sm" onClick={() => setPdfFile(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition-colors"
              onClick={() => document.getElementById("pdf-input")?.click()}
            >
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Drag & drop PDF here or click to browse</p>
              <input id="pdf-input" type="file" accept=".pdf" className="hidden" onChange={handleFileInput} />
            </div>
          )}
        </div>

        {/* Analyze Button */}
        <Button
          onClick={handleAnalyze}
          disabled={loading || !notes.trim()}
          className="w-full h-12 text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Analyzing…
            </>
          ) : (
            "Analyze & Optimize"
          )}
        </Button>
      </main>
    </div>
  );
};

export default Index;
