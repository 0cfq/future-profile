import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, ExternalLink, Terminal, Code2, Cpu, Globe } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
];

const skills = [
  { icon: Code2, name: "Frontend", items: ["React", "TypeScript", "Tailwind"] },
  { icon: Cpu, name: "Backend", items: ["Node.js", "Python", "PostgreSQL"] },
  { icon: Globe, name: "DevOps", items: ["Docker", "AWS", "CI/CD"] },
  { icon: Terminal, name: "Tools", items: ["Git", "Linux", "Vim"] },
];

const projects = [
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
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground grid-bg relative overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-20 space-y-24">
        {/* Hero */}
        <motion.section
          initial="hidden"
          animate="visible"
          className="space-y-6 pt-12"
        >
          <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-primary animate-pulse-glow" />
            <span className="font-mono text-sm text-muted-foreground">available for work</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1]"
          >
            Hey, I'm{" "}
            <span className="gradient-text">Your Name</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-lg text-muted-foreground max-w-lg leading-relaxed"
          >
            Full-stack developer crafting fast, beautiful, and accessible digital experiences.
            I turn complex problems into elegant solutions.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-lg p-3 text-muted-foreground hover:text-primary hover:glow-primary transition-all duration-300"
                aria-label={s.label}
              >
                <s.icon size={20} />
              </a>
            ))}
          </motion.div>
        </motion.section>

        {/* About */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-6"
        >
          <motion.h2 variants={fadeUp} custom={0} className="font-mono text-sm text-primary tracking-widest uppercase">
            About
          </motion.h2>
          <motion.div variants={fadeUp} custom={1} className="glass rounded-xl p-6 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              I'm a developer with a passion for building products that make a difference.
              With expertise spanning the full stack, I focus on performance, clean architecture, and thoughtful design.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies,
              contributing to open source, or writing about software engineering.
            </p>
          </motion.div>
        </motion.section>

        {/* Skills */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-6"
        >
          <motion.h2 variants={fadeUp} custom={0} className="font-mono text-sm text-primary tracking-widest uppercase">
            Skills
          </motion.h2>
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                variants={fadeUp}
                custom={i + 1}
                className="glass rounded-xl p-5 space-y-3 hover:glow-primary transition-all duration-500"
              >
                <div className="flex items-center gap-2 text-primary">
                  <skill.icon size={18} />
                  <span className="font-mono text-sm font-medium">{skill.name}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Projects */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-6"
        >
          <motion.h2 variants={fadeUp} custom={0} className="font-mono text-sm text-primary tracking-widest uppercase">
            Projects
          </motion.h2>
          <div className="space-y-4">
            {projects.map((project, i) => (
              <motion.a
                key={project.title}
                href={project.link}
                variants={fadeUp}
                custom={i + 1}
                className="glass rounded-xl p-6 block group hover:glow-primary transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors mt-1" />
                </div>
                <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="pt-8 border-t border-border"
        >
          <motion.p variants={fadeUp} custom={0} className="text-sm text-muted-foreground font-mono text-center">
            © {new Date().getFullYear()} · Built with passion & pixels
          </motion.p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
