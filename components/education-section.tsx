export function EducationSection() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-mono text-xs tracking-[0.25em] uppercase text-muted-foreground">
        Education
      </h2>

      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg font-bold tracking-tight text-foreground">
          Princeton University
        </h3>
        <p className="font-mono text-xs tracking-[0.12em] uppercase text-muted-foreground">
          Bachelor of Arts in Computer Science
        </p>
        <p className="font-mono text-xs tracking-[0.12em] uppercase text-muted-foreground/70">
          Minors in Statistics & Machine Learning and Visual Arts
        </p>
      </div>
    </section>
  )
}
