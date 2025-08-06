import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "@/lib/utils";

const HoverCard = HoverCardPrimitive.Root;
const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 8, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      // Layout and visual style
      "z-50 w-72 rounded-xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-4 text-slate-200 shadow-[0_8px_32px_0_rgba(31,38,135,0.25)]",
      
      // smooth transition
      "motion-safe:transition-all motion-safe:duration-150 motion-safe:ease-out",
      "motion-safe:opacity-0 motion-safe:scale-95 motion-safe:translate-y-1 data-[state=open]:opacity-100 data-[state=open]:scale-100 data-[state=open]:translate-y-0",
      
      // For closing
      "data-[state=closed]:opacity-0 data-[state=closed]:scale-95 data-[state=closed]:translate-y-1",

      className
    )}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };