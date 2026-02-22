import { Check, Circle } from "lucide-react";

interface SectionChecklistProps {
  text: string;
}

const SECTIONS = [
  { label: "HPI", patterns: ["history of present illness", "hpi", "chief complaint", "presenting complaint", "present illness"] },
  { label: "Vitals", patterns: ["vital", "bp ", "blood pressure", "heart rate", "pulse", "temperature", "temp ", "spo2", "respiratory rate", "o2 sat"] },
  { label: "Labs", patterns: ["lab", "cbc", "bmp", "cmp", "wbc", "hemoglobin", "hgb", "creatinine", "troponin", "bun", "glucose", "potassium", "sodium", "platelet"] },
  { label: "Imaging", patterns: ["imaging", "x-ray", "xray", "ct scan", "ct ", "mri", "ultrasound", "echo", "radiograph", "chest x"] },
  { label: "Exam", patterns: ["physical exam", "examination", "lungs clear", "heart regular", "abdomen soft", "neurological", "musculoskeletal", "respiratory exam", "cardiac exam"] },
  { label: "Assessment", patterns: ["assessment", "plan", "diagnosis", "impression", "a/p", "a&p", "differential", "disposition"] },
];

const detectSection = (text: string, patterns: string[]): boolean => {
  const lower = text.toLowerCase();
  return patterns.some((p) => lower.includes(p));
};

const SectionChecklist = ({ text }: SectionChecklistProps) => (
  <div className="bg-card border border-border rounded-lg p-4">
    <h3 className="text-sm font-semibold text-foreground mb-3">Detected Sections</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {SECTIONS.map(({ label, patterns }) => {
        const found = text.length > 0 && detectSection(text, patterns);
        return (
          <div
            key={label}
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              found ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
            }`}
          >
            {found ? <Check className="h-4 w-4" /> : <Circle className="h-4 w-4 opacity-40" />}
            {label}
          </div>
        );
      })}
    </div>
  </div>
);

export default SectionChecklist;
