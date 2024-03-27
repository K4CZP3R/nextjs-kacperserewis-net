import { getSiteName } from "@/lib/get-site-name";
import { ProjectRepository } from "@/repo/project.repository";
import { H1, P } from "@/components/text";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Link from "next/link";

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
          <div
            className="card bg-neutral text-neutral-content"
            key={project.id}
          >
            <div className="card-body items-center text-center">
              <h2 className="card-title">{project.data.title}</h2>
              <p>{project.data.description}</p>
              <div className="card-actions justify-end">
                {project.data.buttons.map((button) => {
                  return (
                    <Link href={button.path} key={button.path}>
                      <button className="btn btn-sm">{button.title}</button>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
