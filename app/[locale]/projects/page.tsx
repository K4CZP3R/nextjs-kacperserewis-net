import { setStaticParamsLocale } from "next-international/server";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSiteName } from "@/lib/get-site-name";
import { getI18n } from "@/locales/server";
import { ProjectRepository } from "@/repo/project.repository";
import styles from "@/styles/Projects.module.css";
import { Locale } from "@/locales/consts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { H1, P } from "@/components/text";
import { cn } from "@/lib/utils";
import { Badges } from "@/components/badges";

export async function generateMetadata() {
  const t = await getI18n();
  return {
    title: getSiteName(t("projects")),
    description: t("projectsPageDescription"),
  };
}

export default async function Projects({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setStaticParamsLocale(locale);
  const t = await getI18n();
  const projects = await new ProjectRepository().getAll(locale);

  return (
    <div className={cn(styles.content, "pt-4")}>
      <H1>{t("projects")}</H1>
      <P>{t("projectsPageDescription")}</P>

      <div className={cn(styles.projects, "pt-4")}>
        {projects.map((project) => (
          <Card key={project.slug}>
            <CardHeader>
              <CardTitle className="flex flex-col  gap-2">
                {project.title}
                <Badges badges={project.badges ?? []} key={project.slug} />
              </CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              {project.buttons.map((button) => {
                return (
                  <Button variant={"secondary"} key={button.path} asChild>
                    <Link href={button.path}>{button.title}</Link>
                  </Button>
                );
              })}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
