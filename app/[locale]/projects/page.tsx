import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSiteName } from "@/lib/get-site-name";
import { ProjectRepository } from "@/repo/project.repository";
import { H1, P } from "@/components/text";
import { Badges } from "@/components/badges";
import { LinkButton } from "@/components/link-button";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Projects" });

  return {
    title: getSiteName(t("name")),
    description: t("description"),
  };
}

export default async function Projects({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("Projects");

  const projects = await new ProjectRepository().getAll(locale);

  return (
    <div className={"flex flex-col  justify-center  pt-4"}>
      <H1>{t("name")}</H1>
      <P>{t("description")}</P>

      <div className={"max-wpt-4 maxw95vw flex flex-col justify-center gap-4"}>
        {projects.map((project) => (
          <Card key={project.slug}>
            <CardHeader>
              <CardTitle className="flex flex-col  gap-2">
                {project.title}
                <Badges badges={project.badges ?? []} key={project.slug} />
              </CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-wrap gap-1">
              {project.buttons.map((button) => {
                return (
                  <LinkButton
                    href={button.path}
                    variant={"secondary"}
                    key={button.path}
                  >
                    {button.title}
                  </LinkButton>
                );
              })}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
