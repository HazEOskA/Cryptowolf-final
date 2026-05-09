import { motion } from 'framer-motion';
import { ArrowRight, CircleCheck, Command, Cpu, Database, Rocket, ShieldCheck, Wallet } from 'lucide-react';

const dashboardCards = [
  {
    title: 'AI OS Kernel',
    status: 'Operational',
    description: 'Core orchestration runtime handling deterministic agent execution and context flow.',
    action: 'Inspect Kernel',
    icon: Cpu,
  },
  {
    title: 'Project Memory Controller',
    status: 'Synced',
    description: 'Tracks decisions, constraints and architecture history to prevent context drift.',
    action: 'Open Memory',
    icon: Database,
  },
  {
    title: 'Cognitive Supervisor',
    status: 'Monitoring',
    description: 'Runs confidence checks and escalation rules before every autonomous action.',
    action: 'View Rules',
    icon: ShieldCheck,
  },
  {
    title: 'CryptoWolf Signals',
    status: 'Streaming',
    description: 'Streams market intelligence and trigger-ready signals for AI trading copilots.',
    action: 'Analyze Signals',
    icon: Command,
  },
  {
    title: 'Base Agent Layer',
    status: 'Ready',
    description: 'Composable agent primitives for planning, tooling, memory, and execution.',
    action: 'Launch Agent',
    icon: CircleCheck,
  },
  {
    title: 'Deployment Console',
    status: 'Standby',
    description: 'Validates release pipelines and pushes approved builds to edge runtimes.',
    action: 'Deploy Build',
    icon: Rocket,
  },
];

const terminalLogs = [
  '[kernel] Market scanner initialized across 12 exchanges.',
  '[wallet] Signature policy check complete: all keys hardware-bound.',
  '[memory] Audit found 0 unresolved architectural decisions.',
  '[validator] Dependency map and route graph passed deterministic checks.',
  '[deploy] Agent package promoted to production staging lane.',
];

export default function App() {
  return (
    <main className="min-h-screen bg-[#070a12] text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.18),transparent_30%)]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <section className="rounded-3xl border border-white/15 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-5 inline-flex rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
            Runtime Layer v1.0
          </motion.p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">AI OS Launchpad</h1>
          <p className="mt-5 max-w-3xl text-base text-slate-300 sm:text-lg">
            Developer runtime layer for AI systems, agents, memory, crypto signals and deployment workflows.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#dashboard" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
              Open Dashboard <ArrowRight size={17} className="transition group-hover:translate-x-1" />
            </a>
            <a href="#architecture" className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 font-semibold text-slate-100 transition hover:border-violet-300/60 hover:bg-violet-400/10">
              View Architecture
            </a>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-rose-200/20 bg-rose-500/5 p-6 backdrop-blur">
            <h2 className="text-2xl font-bold">Problem</h2>
            <p className="mt-3 text-slate-300">
              AI systems drift, forget past decisions, hallucinate project state, and break architecture rules when context and execution aren&apos;t controlled.
            </p>
          </article>
          <article className="rounded-2xl border border-emerald-200/20 bg-emerald-500/5 p-6 backdrop-blur">
            <h2 className="text-2xl font-bold">Solution</h2>
            <p className="mt-3 text-slate-300">
              AI OS introduces a runtime kernel, intelligent routing, long-horizon memory, validation gates, and deterministic project control for reliable AI delivery.
            </p>
          </article>
        </section>

        <section id="dashboard">
          <h2 className="mb-6 text-3xl font-bold">Interactive Demo Dashboard</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {dashboardCards.map((card) => (
              <div key={card.title} className="rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-cyan-200/50 hover:bg-white/10">
                <div className="flex items-center justify-between">
                  <card.icon size={20} className="text-cyan-300" />
                  <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-2 py-1 text-xs text-emerald-200">{card.status}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{card.description}</p>
                <button className="mt-4 rounded-lg border border-white/20 px-3 py-2 text-sm font-medium transition hover:border-cyan-300/50 hover:text-cyan-200">
                  {card.action}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <article className="rounded-2xl border border-white/15 bg-[#05070d] p-5 shadow-2xl">
            <div className="mb-4 flex items-center gap-2 text-sm text-slate-400">
              <span className="h-2 w-2 rounded-full bg-red-400" />
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="ml-2 font-mono">ai-os-terminal</span>
            </div>
            <div className="space-y-2 font-mono text-sm">
              <p>&gt; scan market</p>
              <p>&gt; check wallet</p>
              <p>&gt; run memory audit</p>
              <p>&gt; validate architecture</p>
              <p>&gt; deploy agent</p>
              <div className="mt-4 space-y-2 text-cyan-300">
                {terminalLogs.map((log) => (
                  <p key={log} className="animate-pulse">{log}</p>
                ))}
              </div>
            </div>
          </article>

          <article id="architecture" className="rounded-2xl border border-violet-200/20 bg-violet-500/5 p-5">
            <h2 className="text-2xl font-bold">Architecture</h2>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm font-medium text-violet-100">
              {['User', 'AI OS Kernel', 'Engines', 'Memory', 'Validator', 'Deploy'].map((node, idx, arr) => (
                <div key={node} className="flex items-center gap-2">
                  <span className="rounded-lg border border-violet-300/35 bg-violet-400/10 px-3 py-2">{node}</span>
                  {idx < arr.length - 1 && <ArrowRight size={14} className="text-violet-300" />}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-2xl border border-white/15 bg-white/5 p-6">
          <h2 className="text-2xl font-bold">Builder Portfolio</h2>
          <p className="mt-2 text-slate-300">Name: Osa · Role: IT / machine operator / AI systems builder</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {['AI OS', 'CryptoWolf OS', 'Inbox Assistant', 'Project Memory Controller'].map((project) => (
              <div key={project} className="rounded-xl border border-white/10 bg-black/20 p-4 text-center text-sm font-medium text-slate-200 hover:border-cyan-300/50 hover:text-cyan-200">
                {project}
              </div>
            ))}
          </div>
        </section>

        <footer className="flex items-center justify-between border-t border-white/10 py-5 text-sm text-slate-400">
          <p>Built with AI OS principles.</p>
          <Wallet size={16} className="text-cyan-300" />
        </footer>
      </div>
    </main>
  );
}
