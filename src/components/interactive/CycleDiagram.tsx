import { ArrowRight } from "lucide-react";

interface CycleDiagramProps {
  steps: string[];
  title?: string;
}

const CycleDiagram = ({ steps, title }: CycleDiagramProps) => {
  const colors = [
    "bg-primary/20 border-primary text-primary",
    "bg-secondary/20 border-secondary text-secondary-foreground",
    "bg-accent/20 border-accent text-accent-foreground",
    "bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300",
    "bg-amber-500/20 border-amber-500 text-amber-700 dark:text-amber-300",
  ];

  return (
    <div className="my-6 p-6 bg-muted/30 rounded-xl border border-border">
      {title && (
        <h4 className="text-lg font-semibold text-foreground mb-4 text-center">
          {title}
        </h4>
      )}
      
      {/* Desktop: Horizontal flow */}
      <div className="hidden md:flex items-center justify-center gap-2 flex-wrap">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={`px-4 py-3 rounded-lg border-2 font-medium text-sm ${colors[index % colors.length]}`}
            >
              {step}
            </div>
            {index < steps.length - 1 && (
              <ArrowRight className="w-5 h-5 mx-2 text-muted-foreground" />
            )}
            {index === steps.length - 1 && (
              <div className="flex items-center ml-2">
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
                <span className="ml-2 text-xs text-muted-foreground italic">
                  (cycle repeats)
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: Vertical flow */}
      <div className="flex md:hidden flex-col items-center gap-2">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`px-4 py-3 rounded-lg border-2 font-medium text-sm w-full text-center ${colors[index % colors.length]}`}
            >
              {step}
            </div>
            {index < steps.length - 1 && (
              <ArrowRight className="w-5 h-5 my-2 text-muted-foreground rotate-90" />
            )}
            {index === steps.length - 1 && (
              <div className="flex flex-col items-center mt-2">
                <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
                <span className="mt-1 text-xs text-muted-foreground italic">
                  (cycle repeats)
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CycleDiagram;
