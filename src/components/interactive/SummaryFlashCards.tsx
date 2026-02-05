 import { useState } from "react";
 import { Card } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { ChevronLeft, ChevronRight, BookOpen, Video, ExternalLink, Clock, RotateCw } from "lucide-react";
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
 
   const handleFlip = () => {
     setIsFlipped(!isFlipped);
   };
 
   if (!cards || cards.length === 0) return null;
 
   const currentCard = cards[currentIndex];
 
   return (
     <div className="space-y-6">
       <div className="flex items-center gap-2">
         <div className="p-2 rounded-full bg-primary/10">
           <BookOpen className="h-5 w-5 text-primary" />
         </div>
         <h4 className="font-semibold text-foreground text-lg">Read / Listen / Watch!</h4>
       </div>
 
       <p className="text-muted-foreground">
         Explore these curated resources to deepen your understanding of the concepts covered in this section.
       </p>
 
       {/* Stacked Cards Container */}
       <div className="relative h-[320px] perspective-1000">
         {/* Stack Effect - Background Cards */}
         {cards.length > 2 && (
           <div className="absolute inset-x-6 top-2 h-full">
             <Card className="h-full bg-muted/40 border-muted shadow-sm" />
           </div>
         )}
         {cards.length > 1 && (
           <div className="absolute inset-x-3 top-1 h-full">
             <Card className="h-full bg-muted/60 border-muted shadow-md" />
           </div>
         )}
 
         {/* Main Flippable Card */}
         <div 
           className={cn(
             "absolute inset-0 transition-transform duration-500 transform-style-3d cursor-pointer",
             isFlipped && "rotate-y-180"
           )}
           onClick={handleFlip}
           style={{
             transformStyle: "preserve-3d",
             transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
           }}
         >
           {/* Front of Card */}
           <Card 
             className="absolute inset-0 p-6 bg-gradient-to-br from-card via-card to-muted/30 backface-hidden overflow-hidden"
             style={{ backfaceVisibility: "hidden" }}
           >
             <div className="h-full flex flex-col">
               {/* Header with type badge */}
               <div className="flex items-start justify-between mb-4">
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
               <h5 className="font-semibold text-xl text-foreground leading-tight mb-3">
                 {currentCard.title}
               </h5>
 
               {/* Source */}
               <p className="text-sm text-muted-foreground mb-4">
                 Source: {currentCard.source}
               </p>
 
               {/* Flip indicator */}
               <div className="mt-auto flex items-center justify-center gap-2 text-sm text-primary font-medium">
                 <RotateCw className="h-4 w-4 animate-pulse" />
                 <span>Click to flip for details</span>
               </div>
             </div>
           </Card>
 
           {/* Back of Card */}
           <Card 
             className="absolute inset-0 p-6 bg-gradient-to-br from-primary/5 via-card to-secondary/5 overflow-hidden"
             style={{ 
               backfaceVisibility: "hidden",
               transform: "rotateY(180deg)"
             }}
           >
             <div className="h-full flex flex-col">
               {/* Description */}
               <p className="text-foreground/90 leading-relaxed flex-1">
                 {currentCard.description}
               </p>
 
               {/* External Link */}
               {currentCard.link && (
                 <a
                   href={currentCard.link}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium mt-4"
                   onClick={(e) => e.stopPropagation()}
                 >
                   Read More
                   <ExternalLink className="h-3 w-3" />
                 </a>
               )}
 
               {/* Flip back indicator */}
               <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                 <RotateCw className="h-4 w-4" />
                 <span>Click to flip back</span>
               </div>
             </div>
           </Card>
         </div>
       </div>
 
       {/* Card counter and Flip button */}
       <div className="flex items-center justify-between">
         <span className="text-sm text-muted-foreground">
           Card {currentIndex + 1} of {cards.length}
         </span>
         <Button 
           variant="outline" 
           size="sm" 
           onClick={handleFlip}
           className="gap-2"
         >
           <RotateCw className="h-4 w-4" />
           Flip Card
         </Button>
       </div>
 
       {/* Navigation */}
       <div className="flex items-center justify-center gap-4">
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
                 "w-2.5 h-2.5 rounded-full transition-all",
                 idx === currentIndex
                   ? "bg-primary w-6"
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
