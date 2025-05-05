import { useCallback } from "react";
import { scrollToElement } from "@/lib/utils";

export const useScrollToSection = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    scrollToElement(sectionId);
  }, []);
  
  return scrollToSection;
};
