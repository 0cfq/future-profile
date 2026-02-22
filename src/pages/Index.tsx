import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, Globe, ExternalLink, Terminal, Code2, Cpu, Settings, Link as LinkIcon } from "lucide-react";
import { useBioData } from "@/hooks/useBioData";
import EditPanel from "@/components/EditPanel";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const platformIcons: Record<string, any> = {
  GitHub: Github,
  Twitter: Twitter,
  LinkedIn: Linkedin,
  Email: Mail,
};

const categoryIcons: Record<string, any> = {
  Frontend: Code2,
  Backend: Cpu,
  DevOps: Globe,
  Tools: Terminal,
};

const Index = () => {
  const { data, updateField, resetToDefault } = useBioData();
  const [editOpen, setEditOpen] = useState(false);

  const getSocialIcon = (platform: string) => platformIcons[platform] || LinkIcon;
  const getCategoryIcon = (category: string) => categoryIcons[category] || Code2;

  return (
    <div className="min-h-screen bg-background text-foreground grid-bg relative overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      {/* Edit toggle */}
      <button
        onClick={() => setEditOpen(true)}
        className="fixed top-6 right-6 z-30 glass rounded-lg p-3 text-muted-foreground hover:text-primary hover:glow-primary transition-all duration-300"
        aria-label="Customize"
      >
        <Settings size={18} />
      </button>

      <EditPanel
        data={data}
        updateField={updateField}
        resetToDefault={resetToDefault}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-20 space-y-24">
        {/* Hero */}
        <motion.section initial="hidden" animate="visible" className="space-y-6 pt-12">
          <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-primary animate-pulse-glow" />
            <span className="font-mono text-sm text-muted-foreground">{data.status}</span>
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1} className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1]">
            Hey, I'm <span className="gradient-text">{data.name}</span>
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            {data.tagline}
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="flex gap-3">
            {data.socials.map((s) => {
              const Icon = getSocialIcon(s.platform);
              return (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-lg p-3 text-muted-foreground hover:text-primary hover:glow-primary transition-all duration-300"
                  aria-label={s.platform}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </motion.div>
        </motion.section>

        {/* About */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="space-y-6">
          <motion.h2 variants={fadeUp} custom={0} className="font-mono text-sm text-primary tracking-widest uppercase">
            About
          </motion.h2>
          <motion.div variants={fadeUp} custom={1} className="glass rounded-xl p-6 space-y-4">
            {data.bio.map((para, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed">{para}</p>
            ))}
          </motion.div>
        </motion.section>

        {/* Skills */}
        {data.skills.length > 0 && (
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="space-y-6">
            <motion.h2 variants={fadeUp} custom={0} className="font-mono text-sm text-primary tracking-widest uppercase">
              Skills
            </motion.h2>
            <div className="grid grid-cols-2 gap-4">
              {data.skills.map((skill, i) => {
                const Icon = getCategoryIcon(skill.category);
                return (
                  <motion.div key={skill.category + i} variants={fadeUp} custom={i + 1} className="glass rounded-xl p-5 space-y-3 hover:glow-primary transition-all duration-500">
                    <div className="flex items-center gap-2 text-primary">
                      <Icon size={18} />
                      <span className="font-mono text-sm font-medium">{skill.category}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <span key={item} className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary text-muted-foreground">
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="space-y-6">
            <motion.h2 variants={fadeUp} custom={0} className="font-mono text-sm text-primary tracking-widest uppercase">
              Projects
            </motion.h2>
            <div className="space-y-4">
              {data.projects.map((project, i) => (
                <motion.a
                  key={project.title + i}
                  href={project.link}
                  variants={fadeUp}
                  custom={i + 1}
                  className="glass rounded-xl p-6 block group hover:glow-primary transition-all duration-500"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                    <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors mt-1" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.section>
        )}

        {/* Footer */}
        <motion.footer initial="hidden" whileInView="visible" viewport={{ once: true }} className="pt-8 border-t border-border">
          <motion.p variants={fadeUp} custom={0} className="text-sm text-muted-foreground font-mono text-center">
            © {new Date().getFullYear()} · Built with passion & pixels
          </motion.p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
