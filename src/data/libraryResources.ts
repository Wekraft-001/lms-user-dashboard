import { getModuleContent } from "@/pages/Module/content";

export interface LibraryResource {
  type: "video" | "pdf" | "link";
  title: string;
  module: string;
  moduleId: number;
  url: string;
  description?: string;
  duration?: string;
  size?: string;
}

// Helper function to convert YouTube URLs to embed format
const convertToEmbedUrl = (url: string): string => {
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes("youtube.com/watch")) {
    const urlParams = new URLSearchParams(url.split("?")[1]);
    const videoId = urlParams.get("v");
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return url;
};

// Extract all videos from module content
export const getLibraryResources = (): LibraryResource[] => {
  const resources: LibraryResource[] = [];
  const moduleIds = [1, 2, 3, 4];

  moduleIds.forEach((moduleId) => {
    const moduleContent = getModuleContent(moduleId);
    if (!moduleContent) return;

    moduleContent.segments.forEach((segment) => {
      // Add primary video (HTML5 hosted)
      if (segment.videoUrl) {
        resources.push({
          type: "video",
          title: `${segment.title} - Introduction`,
          module: `Module ${moduleId}`,
          moduleId,
          url: segment.videoUrl,
          description: `Introductory video for ${segment.title}`,
          duration: segment.duration,
        });
      }

      // Add supplementary videos (YouTube embeds)
      if (segment.videos && segment.videos.length > 0) {
        segment.videos.forEach((video) => {
          resources.push({
            type: "video",
            title: video.label,
            module: `Module ${moduleId}`,
            moduleId,
            url: convertToEmbedUrl(video.url),
            description: video.description || `Supplementary video for ${segment.title}`,
          });
        });
      }
    });
  });

  return resources;
};

// Static resources that can be manually added (slides, PDFs, external links)
export const staticResources: LibraryResource[] = [
  {
    type: "pdf",
    title: "WHO Framework for Pandemic Preparedness",
    module: "Module 1",
    moduleId: 1,
    url: "#",
    size: "2.4 MB",
    description: "Comprehensive guide to global pandemic preparedness standards",
  },
  {
    type: "pdf",
    title: "Integration Toolkit: CLM + PPR",
    module: "Module 3",
    moduleId: 3,
    url: "#",
    size: "5.1 MB",
    description: "Step-by-step guide for integrating CLM into PPR frameworks",
  },
  {
    type: "link",
    title: "Africa CDC PPR Resources",
    module: "Module 1",
    moduleId: 1,
    url: "https://africacdc.org",
    description: "External resource hub from Africa CDC",
  },
  {
    type: "pdf",
    title: "Advocacy Strategy Template",
    module: "Module 4",
    moduleId: 4,
    url: "#",
    size: "1.8 MB",
    description: "Customizable template for advocacy campaigns",
  },
  {
    type: "link",
    title: "WHO International Health Regulations",
    module: "Module 1",
    moduleId: 1,
    url: "https://www.who.int/health-topics/international-health-regulations",
    description: "Official WHO IHR documentation and resources",
  },
];

// Get all resources (videos from modules + static resources)
export const getAllLibraryResources = (): LibraryResource[] => {
  const videoResources = getLibraryResources();
  return [...videoResources, ...staticResources];
};
