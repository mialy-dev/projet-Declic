import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Code, Smartphone, Palette, TrendingUp, Users, Clock, Award } from "lucide-react";
import BlackHole from "@/components/ui/black-hole";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Formation Digital — Déclic Madagascar" },
      {
        name: "description",
        content:
          "Déclic Madagascar forme les talents de demain aux métiers du digital : développement web, applications mobiles, design UI/UX et marketing digital à Antananarivo.",
      },
      { property: "og:title", content: "Formation Digital — Déclic Madagascar" },
      {
        property: "og:description",
        content:
          "Formations pratiques aux métiers du digital à Antananarivo. Apprenez le web, le mobile, le design et le marketing avec des professionnels.",
      },
    ],
  }),
  component: Index,
});

const formations = [
  {
    icon: Code,
    title: "Développement web",
    text: "HTML, CSS, JavaScript, React et Node.js. Créez des sites modernes et performants pas à pas.",
  },
  {
    icon: Smartphone,
    title: "Applications mobiles",
    text: "React Native et Flutter. Concevez des apps iOS et Android avec un vrai projet en portfolio.",
  },
  {
    icon: Palette,
    title: "Design UI/UX",
    text: "Figma, principes de design, prototypage et expérience utilisateur pour des interfaces impactantes.",
  },
  {
    icon: TrendingUp,
    title: "Marketing digital",
    text: "SEO, réseaux sociaux, publicité en ligne et analytics pour faire grandir une marque en ligne.",
  },
];

function Index() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <section className="relative flex min-h-screen flex-col overflow-hidden">
        <BlackHole />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-background" />

        <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <span className="font-display text-lg font-bold tracking-tight">
            Déclic<span className="text-halo"> Madagascar</span>
          </span>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#formations" className="transition-colors hover:text-foreground">
              Formations
            </a>
            <a href="#methode" className="transition-colors hover:text-foreground">
              Méthode
            </a>
            <a href="#contact" className="transition-colors hover:text-foreground">
              Contact
            </a>
          </nav>
          <Button asChild size="sm" className="shadow-halo">
            <a href="#contact">S&apos;inscrire</a>
          </Button>
        </header>

        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 pb-24 text-center">
          <span className="rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-muted-foreground backdrop-blur">
            Formations digitales · Antananarivo
          </span>
          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1.05] sm:text-7xl">
            Formation <span className="text-halo">Digital</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
            Apprenez les métiers du web et du mobile avec des formateurs expérimentés.
            De la première ligne de code à votre premier projet pro, on vous accompagne.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="shadow-halo">
              <a href="#contact">
                S&apos;inscrire maintenant
                <ArrowRight className="ml-2 size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#formations">Voir les formations</a>
            </Button>
          </div>
        </div>
      </section>

      <section id="formations" className="mx-auto w-full max-w-6xl px-6 py-24">
        <h2 className="text-3xl font-bold sm:text-4xl">Nos formations</h2>
        <p className="mt-3 max-w-lg text-muted-foreground">
          Des parcours concrets, pensés pour être mis en pratique immédiatement.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {formations.map((f) => (
            <article
              key={f.title}
              className="rounded-2xl border border-border bg-card/60 p-7 transition-colors hover:border-primary/50"
            >
              <f.icon className="size-6 text-primary" />
              <h3 className="mt-5 text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="methode"
        className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-24 md:grid-cols-2"
      >
        <div>
          <h2 className="text-3xl font-bold sm:text-4xl">Une pédagogie simple</h2>
          <p className="mt-4 text-muted-foreground">
            Cours en petits groupes, exercices pratiques et projets réels. Chaque module
            est conçu pour vous rendre autonome rapidement, sans théorie inutile.
          </p>
          <ul className="mt-6 space-y-3 text-muted-foreground">
            <li className="flex items-center gap-3">
              <BookOpen className="size-4 text-primary" />
              <span>Supports et replay des séances inclus</span>
            </li>
            <li className="flex items-center gap-3">
              <Users className="size-4 text-primary" />
              <span>Suivi personnalisé par formateur</span>
            </li>
            <li className="flex items-center gap-3">
              <Award className="size-4 text-primary" />
              <span>Certificat à la fin du parcours</span>
            </li>
          </ul>
        </div>
        <dl className="grid grid-cols-2 gap-6">
          {[
            ["12+", "formations actives"],
            ["300+", "apprenants formés"],
            ["80%", "de projets réalisés en cours"],
            ["Tana", "centre de formation à Madagascar"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-border bg-card/40 p-6">
              <dt className="text-3xl font-bold text-halo">{k}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="contact" className="mx-auto w-full max-w-6xl px-6 pb-28">
        <div className="rounded-3xl border border-border bg-card/60 p-10 text-center shadow-halo">
          <h2 className="text-3xl font-bold sm:text-4xl">Rejoignez la prochaine promotion</h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Écrivez-nous pour connaître les prochaines sessions et réserver votre place.
          </p>
          <Button asChild size="lg" className="mt-8">
            <a href="mailto:contact@declic.mg">contact@declic.mg</a>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Déclic Madagascar — Formation Digital
      </footer>
    </main>
  );
}
