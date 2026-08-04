import { Reveal } from "./Reveal";

export type Stat = { value: string; label: string };

export function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s, i) => (
        <Reveal key={i} delay={i * 0.08}>
          <div className="card-ze p-6 text-center">
            <div className="font-display text-3xl font-bold text-cyan">
              {s.value}
            </div>
            <div className="mt-2 text-sm text-muted">{s.label}</div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
