import clsx from "clsx";

export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={clsx("py-20 lg:py-28", className)}>
      <div className="container-ze">{children}</div>
    </section>
  );
}
