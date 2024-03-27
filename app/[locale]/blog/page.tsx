import { getSiteName } from "@/lib/get-site-name";
import { PostRepository } from "@/repo/post.repository";
import { H1, P } from "@/components/text";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LinkButton } from "@/components/link-button";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Link from "next/link";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Blog" });

  return {
    title: getSiteName(t("name")),
    description: t("description"),
  };
}

export default async function Blog({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("Blog");
  const posts = await new PostRepository().getAll(locale);
  return (
    <div className={"flex flex-col justify-center pt-4"}>
      <H1>{t("name")}</H1>
      <P>{t("description")}</P>

      <div className={"maxw95vw flex flex-col justify-center gap-4 pt-4"}>
        {posts.map((post) => {
          return (
            <div
              className="card w-96 bg-neutral text-neutral-content"
              key={post.id}
            >
              <div className="card-body items-center text-center">
                <h2 className="card-title">{post.data.title}</h2>
                <p>{post.data.description}</p>
                <div className="card-actions justify-end">
                  <Link href={`blog/post/${post.id}`}>
                    <button className="btn btn-primary">Read</button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
