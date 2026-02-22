import { useState } from "react";
import { X, Plus, Trash2, Settings, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { BioData, Social, Skill, Project } from "@/hooks/useBioData";

interface EditPanelProps {
  data: BioData;
  updateField: <K extends keyof BioData>(key: K, value: BioData[K]) => void;
  resetToDefault: () => void;
  open: boolean;
  onClose: () => void;
}

const EditPanel = ({ data, updateField, resetToDefault, open, onClose }: EditPanelProps) => {
  const [activeTab, setActiveTab] = useState<"profile" | "skills" | "projects" | "socials">("profile");

  const tabs = [
    { id: "profile" as const, label: "Profile" },
    { id: "skills" as const, label: "Skills" },
    { id: "projects" as const, label: "Projects" },
    { id: "socials" as const, label: "Socials" },
  ];

  const addSkill = () => {
    updateField("skills", [...data.skills, { category: "New Skill", items: [] }]);
  };

  const removeSkill = (index: number) => {
    updateField("skills", data.skills.filter((_, i) => i !== index));
  };

  const updateSkill = (index: number, skill: Skill) => {
    const updated = [...data.skills];
    updated[index] = skill;
    updateField("skills", updated);
  };

  const addProject = () => {
    updateField("projects", [...data.projects, { title: "New Project", description: "", tags: [], link: "#" }]);
  };

  const removeProject = (index: number) => {
    updateField("projects", data.projects.filter((_, i) => i !== index));
  };

  const updateProject = (index: number, project: Project) => {
    const updated = [...data.projects];
    updated[index] = project;
    updateField("projects", updated);
  };

  const addSocial = () => {
    updateField("socials", [...data.socials, { platform: "Website", url: "https://" }]);
  };

  const removeSocial = (index: number) => {
    updateField("socials", data.socials.filter((_, i) => i !== index));
  };

  const updateSocial = (index: number, social: Social) => {
    const updated = [...data.socials];
    updated[index] = social;
    updateField("socials", updated);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md glass border-l border-border overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary">
                  <Settings size={18} />
                  <h2 className="font-mono text-sm font-medium tracking-widest uppercase">Customize</h2>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={resetToDefault}
                    className="p-2 rounded-lg text-muted-foreground hover:text-destructive transition-colors"
                    title="Reset to defaults"
                  >
                    <RotateCcw size={16} />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 p-1 rounded-lg bg-secondary">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 text-xs font-mono py-2 px-3 rounded-md transition-all ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-mono text-xs text-muted-foreground">Name</Label>
                    <Input
                      value={data.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="glass border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-mono text-xs text-muted-foreground">Status</Label>
                    <Input
                      value={data.status}
                      onChange={(e) => updateField("status", e.target.value)}
                      className="glass border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-mono text-xs text-muted-foreground">Tagline</Label>
                    <Textarea
                      value={data.tagline}
                      onChange={(e) => updateField("tagline", e.target.value)}
                      className="glass border-border min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-mono text-xs text-muted-foreground">Bio paragraphs</Label>
                    {data.bio.map((para, i) => (
                      <div key={i} className="flex gap-2">
                        <Textarea
                          value={para}
                          onChange={(e) => {
                            const updated = [...data.bio];
                            updated[i] = e.target.value;
                            updateField("bio", updated);
                          }}
                          className="glass border-border min-h-[60px]"
                        />
                        <button
                          onClick={() => updateField("bio", data.bio.filter((_, idx) => idx !== i))}
                          className="p-2 text-muted-foreground hover:text-destructive shrink-0"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateField("bio", [...data.bio, ""])}
                      className="w-full border-dashed"
                    >
                      <Plus size={14} /> Add paragraph
                    </Button>
                  </div>
                </div>
              )}

              {/* Skills Tab */}
              {activeTab === "skills" && (
                <div className="space-y-4">
                  {data.skills.map((skill, i) => (
                    <div key={i} className="glass rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <Input
                          value={skill.category}
                          onChange={(e) => updateSkill(i, { ...skill, category: e.target.value })}
                          className="glass border-border h-8 text-sm w-32"
                        />
                        <button
                          onClick={() => removeSkill(i)}
                          className="p-1 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skill.items.map((item, j) => (
                          <span
                            key={j}
                            className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary text-muted-foreground flex items-center gap-1 group"
                          >
                            {item}
                            <button
                              onClick={() => updateSkill(i, { ...skill, items: skill.items.filter((_, idx) => idx !== j) })}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={10} />
                            </button>
                          </span>
                        ))}
                        <button
                          onClick={() => {
                            const name = prompt("Skill name:");
                            if (name) updateSkill(i, { ...skill, items: [...skill.items, name] });
                          }}
                          className="text-xs font-mono px-2.5 py-1 rounded-md border border-dashed border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addSkill} className="w-full border-dashed">
                    <Plus size={14} /> Add skill category
                  </Button>
                </div>
              )}

              {/* Projects Tab */}
              {activeTab === "projects" && (
                <div className="space-y-4">
                  {data.projects.map((project, i) => (
                    <div key={i} className="glass rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <Input
                          value={project.title}
                          onChange={(e) => updateProject(i, { ...project, title: e.target.value })}
                          placeholder="Title"
                          className="glass border-border h-8 text-sm"
                        />
                        <button
                          onClick={() => removeProject(i)}
                          className="p-1 text-muted-foreground hover:text-destructive ml-2 shrink-0"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <Textarea
                        value={project.description}
                        onChange={(e) => updateProject(i, { ...project, description: e.target.value })}
                        placeholder="Description"
                        className="glass border-border min-h-[50px] text-sm"
                      />
                      <Input
                        value={project.link}
                        onChange={(e) => updateProject(i, { ...project, link: e.target.value })}
                        placeholder="Link URL"
                        className="glass border-border h-8 text-sm"
                      />
                      <div className="space-y-1">
                        <Label className="font-mono text-xs text-muted-foreground">Tags (comma-separated)</Label>
                        <Input
                          value={project.tags.join(", ")}
                          onChange={(e) =>
                            updateProject(i, {
                              ...project,
                              tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                            })
                          }
                          className="glass border-border h-8 text-sm"
                        />
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addProject} className="w-full border-dashed">
                    <Plus size={14} /> Add project
                  </Button>
                </div>
              )}

              {/* Socials Tab */}
              {activeTab === "socials" && (
                <div className="space-y-4">
                  {data.socials.map((social, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <Input
                        value={social.platform}
                        onChange={(e) => updateSocial(i, { ...social, platform: e.target.value })}
                        placeholder="Platform"
                        className="glass border-border h-8 text-sm w-28 shrink-0"
                      />
                      <Input
                        value={social.url}
                        onChange={(e) => updateSocial(i, { ...social, url: e.target.value })}
                        placeholder="URL"
                        className="glass border-border h-8 text-sm"
                      />
                      <button
                        onClick={() => removeSocial(i)}
                        className="p-1 text-muted-foreground hover:text-destructive shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addSocial} className="w-full border-dashed">
                    <Plus size={14} /> Add social link
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EditPanel;
