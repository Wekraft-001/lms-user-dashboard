import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, BookOpen, Headphones, Video, ExternalLink, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SummaryCard {
  title: string;
  source: string;
  type: "Policy Brief" | "Framework" | "Case Study" | "Article" | "Video" | "Guide" | "Fact Sheet" | "Commentary" | "News Feature" | "Academic Article";
  readingTime: string;
  description: string;
  link?: string;
}

interface SummaryFlashCardsProps {
  cards: SummaryCard[];
}

const getTypeIcon = (type: SummaryCard["type"]) => {
  switch (type) {
    case "Video":
      return <Video className="h-4 w-4" />;
    case "Policy Brief":
    case "Framework":
    case "Guide":
    case "Fact Sheet":
      return <BookOpen className="h-4 w-4" />;
    default:
      return <BookOpen className="h-4 w-4" />;
  }
};

const getTypeColor = (type: SummaryCard["type"]) => {
  switch (type) {
    case "Video":
      return "bg-primary/10 text-primary border-primary/20";
    case "Policy Brief":
    case "Framework":
      return "bg-secondary/10 text-secondary border-secondary/20";
    case "Case Study":
    case "News Feature":
      return "bg-accent/10 text-accent-foreground border-accent/20";
    case "Academic Article":
    case "Commentary":
      return "bg-muted text-muted-foreground border-muted";
    default:
      return "bg-success/10 text-success border-success/20";
  }
};

export const SummaryFlashCards = ({ cards }: SummaryFlashCardsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  if (!cards || cards.length === 0) return null;

  const currentCard = cards[currentIndex];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-full bg-primary/10">
          <BookOpen className="h-5 w-5 text-primary" />
        </div>
        <h4 className="font-semibold text-foreground">Read / Listen / Watch!</h4>
      </div>

      <div className="relative">
        {/* Stack Effect - Background Cards */}
        {cards.length > 2 && (
          <div className="absolute inset-x-4 -top-2 h-full">
            <Card className="h-full bg-muted/30 border-muted" />
          </div>
        )}
        {cards.length > 1 && (
          <div className="absolute inset-x-2 -top-1 h-full">
            <Card className="h-full bg-muted/50 border-muted" />
          </div>
        )}

        {/* Main Card */}
        <Card 
          className={cn(
            "relative p-6 cursor-pointer transition-all duration-300 transform hover:scale-[1.02]",
            "bg-gradient-to-br from-card to-muted/20"
          )}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="space-y-4">
            {/* Header with type badge */}
            <div className="flex items-start justify-between">
              <div className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
                getTypeColor(currentCard.type)
              )}>
                {getTypeIcon(currentCard.type)}
                {currentCard.type}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {currentCard.readingTime}
              </div>
            </div>

            {/* Title */}
            <h5 className="font-semibold text-lg text-foreground leading-tight">
              {currentCard.title}
            </h5>

            {/* Source */}
            <p className="text-sm text-muted-foreground">
              Source: {currentCard.source}
            </p>

            {/* Description */}
            <p className="text-sm text-foreground/80 leading-relaxed">
              {currentCard.description}
            </p>

            {/* External Link */}
            {currentCard.link && (
              <a
                href={currentCard.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                Read More
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          {/* Click hint */}
          <p className="text-xs text-muted-foreground text-center mt-4">
            Click to flip • {currentIndex + 1} of {cards.length}
          </p>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          disabled={cards.length <= 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {cards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsFlipped(false);
                setCurrentIndex(idx);
              }}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                idx === currentIndex
                  ? "bg-primary w-4"
                  : "bg-muted hover:bg-muted-foreground/30"
              )}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          disabled={cards.length <= 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
