import { setStaticParamsLocale } from "next-international/server";
import Button from "../../../components/button/button";
import Card from "../../../components/card/card";
import { getSiteName } from "../../../lib/get-site-name";
import { getCurrentLocale, getI18n } from "../../../locales/server";
import { ProjectRepository } from "../../../repo/project.repository";
import styles from "../../../styles/Projects.module.css";
import { Locale } from "@/locales/consts";

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
    <div className={styles.content}>
      <h1>{t("projects")}</h1>
      <p>{t("projectsPageDescription")}</p>

      <div className={styles.projects}>
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
                  <Button key={button.path} path={button.path}>
                    {button.title}
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
