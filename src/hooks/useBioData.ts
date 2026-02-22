import { useState, useEffect, useCallback } from "react";

export interface Social {
  platform: string;
  url: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

export interface BioData {
  name: string;
  tagline: string;
  bio: string[];
  status: string;
  socials: Social[];
  skills: Skill[];
  projects: Project[];
}

const defaultData: BioData = {
  name: "Your Name",
  tagline: "Full-stack developer crafting fast, beautiful, and accessible digital experiences. I turn complex problems into elegant solutions.",
  status: "available for work",
  bio: [
    "I'm a developer with a passion for building products that make a difference. With expertise spanning the full stack, I focus on performance, clean architecture, and thoughtful design.",
    "When I'm not coding, you'll find me exploring new technologies, contributing to open source, or writing about software engineering.",
  ],
  socials: [
    { platform: "GitHub", url: "https://github.com" },
    { platform: "Twitter", url: "https://twitter.com" },
    { platform: "LinkedIn", url: "https://linkedin.com" },
    { platform: "Email", url: "mailto:hello@example.com" },
  ],
  skills: [
    { category: "Frontend", items: ["React", "TypeScript", "Tailwind"] },
    { category: "Backend", items: ["Node.js", "Python", "PostgreSQL"] },
    { category: "DevOps", items: ["Docker", "AWS", "CI/CD"] },
    { category: "Tools", items: ["Git", "Linux", "Vim"] },
  ],
  projects: [
    {
      title: "Project Alpha",
      description: "A next-gen web platform with real-time collaboration features.",
      tags: ["React", "WebSocket", "TypeScript"],
      link: "#",
    },
    {
      title: "Neural Engine",
      description: "ML-powered analytics dashboard for enterprise data.",
      tags: ["Python", "TensorFlow", "D3.js"],
      link: "#",
    },
    {
      title: "Quantum CLI",
      description: "Developer productivity tool with intelligent code scaffolding.",
      tags: ["Rust", "CLI", "Open Source"],
      link: "#",
    },
  ],
};

const STORAGE_KEY = "bio-site-data";

export function useBioData() {
  const [data, setData] = useState<BioData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return { ...defaultData, ...JSON.parse(stored) };
    } catch {}
    return defaultData;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateField = useCallback(<K extends keyof BioData>(key: K, value: BioData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetToDefault = useCallback(() => {
    setData(defaultData);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { data, updateField, resetToDefault };
}
