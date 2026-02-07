// Central content hub - imports from separate module files
export type {
  ScenarioData,
  ReflectionData,
  VideoItem,
  CycleDiagramData,
  ModuleSegment,
  ModuleContent,
} from "./types";

import { module1Content } from "./module1Content";
import { module2Content } from "./module2Content";
import { module3Content } from "./module3Content";
import { module4Content } from "./module4Content";
import { ModuleContent } from "./types";

// Function to get module content by ID
export const getModuleContent = (moduleId: number): ModuleContent => {
  switch (moduleId) {
    case 1:
      return module1Content;
    case 2:
      return module2Content;
    case 3:
      return module3Content;
    case 4:
      return module4Content;
    default:
      return module1Content;
  }
};

// Export individual modules for direct access if needed
export { module1Content, module2Content, module3Content, module4Content };

// Export for backward compatibility
export const moduleContent = module1Content;
