import { setStaticParamsLocale } from "next-international/server";

import Card from "../../../components/card/card";
import { getSiteName } from "../../../lib/get-site-name";
import { getCurrentLocale, getI18n } from "../../../locales/server";
import { ProjectRepository } from "../../../repo/project.repository";
import styles from "../../../styles/Projects.module.css";
import { Locale } from "@/locales/consts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { H1, P } from "@/components/text";
import { cn } from "@/lib/utils";

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
          <Card
            key={project.slug}
            title={project.title}
            description={project.description}
            hashTags={project.tags}
          >
            <div className={styles.buttons}>
              {project.buttons.map((button) => {
                return (
                  <Button variant={"secondary"} key={button.path} asChild>
                    <Link href={button.path}>{button.title}</Link>
                  </Button>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
