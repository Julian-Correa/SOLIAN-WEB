import { AlertCircle, ArrowLeft, ArrowRight, Check, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Seo } from '@/components/ui/Seo';
import { CtaSection } from '@/components/sections/CtaSection';
import { CASE_STUDIES } from '@/config/caseStudies';

const study = CASE_STUDIES[0];

const meta = [
  { label: 'Sector', value: study.sector },
  { label: 'Tipo', value: study.type },
  { label: 'Estado', value: study.status },
];

export function DemoPage() {
  return (
    <>
      <Seo
        title="Caso de estudio: Sistema de gestión para taller mecánico | SOLIAN"
        description="Cómo diseñamos una plataforma para ordenar turnos, repuestos e historial de mantenimientos en talleres mecánicos."
        path="/demo"
      />

      <section className="bg-cream pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Link
              to="/proyectos"
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-slate transition-colors hover:text-petrolio"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Volver a proyectos
            </Link>
          </Reveal>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-petrolio/15 bg-white px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-petrolio">
                  <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                  {study.eyebrow}
                </span>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-petrolio sm:text-5xl">
                  {study.title}
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">{study.summary}</p>
              </Reveal>

              <Reveal delay={300}>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Button to="/contacto" size="lg">
                    Quiero algo similar
                  </Button>
                  <Button to="/proyectos" size="lg" variant="secondary">
                    Ver otros proyectos
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal delay={200}>
              <dl className="grid grid-cols-2 gap-6 rounded-2xl border border-petrolio/10 bg-white p-6 shadow-sm sm:p-8">
                {meta.map((item) => (
                  <div key={item.label}>
                    <dt className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-slate">
                      {item.label}
                    </dt>
                    <dd className="mt-2 font-display text-base font-semibold text-petrolio">
                      {item.value}
                    </dd>
                  </div>
                ))}

                <div className="col-span-2">
                  <dt className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-slate">
                    Tecnologías
                  </dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {study.stack.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full bg-petrolio/5 px-3 py-1 font-sans text-xs font-medium text-petrolio"
                      >
                        {technology}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
            <SectionHeading
              eyebrow="Contexto"
              title={study.challenge.heading}
              description={study.challenge.body}
              align="left"
            />

            <Reveal delay={100}>
              <ul className="space-y-4">
                {study.challenge.painPoints.map((point) => (
                  <li
                    key={point}
                    className="flex gap-4 rounded-2xl border border-petrolio/10 bg-cream p-5"
                  >
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                    <span className="font-sans text-base leading-relaxed text-petrolio">{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-petrolio py-20 text-cream sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Propuesta"
            title={study.solution.heading}
            description={study.solution.body}
            dark
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {study.modules.map((module, index) => (
              <Reveal key={module.title} delay={index * 60}>
                <article className="flex h-full flex-col rounded-2xl border border-cream/10 bg-cream/5 p-6">
                  <Layers className="h-6 w-6 text-accent" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-xl font-bold text-cream">{module.title}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-cream/70">
                    {module.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Proceso"
            title="Cómo lo abordamos"
            description="Un recorrido por etapas, con entregas claras en cada paso del proyecto."
          />

          <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {study.approach.map((step, index) => (
              <Reveal key={step.title} delay={index * 80}>
                <li className="h-full rounded-2xl border border-petrolio/10 bg-white p-6 shadow-sm">
                  <span className="font-display text-3xl font-extrabold text-accent/40">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-petrolio">{step.title}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-slate">
                    {step.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
            <SectionHeading
              eyebrow="Objetivos"
              title="Qué buscamos lograr"
              description="Los resultados que persigue este tipo de solución en la operación diaria del taller."
              align="left"
            />

            <Reveal delay={100}>
              <ul className="space-y-4">
                {study.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-4">
                    <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="font-sans text-base leading-relaxed text-petrolio">
                      {outcome}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-accent transition-colors hover:text-accent-dark"
                >
                  Contanos tu caso
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
