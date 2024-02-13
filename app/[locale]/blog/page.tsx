import { getSiteName } from "@/lib/get-site-name";
import { getI18n } from "@/locales/server";
import { PostRepository } from "@/repo/post.repository";
import styles from "@/styles/Blog.module.css";
import { Locale } from "@/locales/consts";
import { setStaticParamsLocale } from "next-international/server";
import { H1, P } from "@/components/text";
import { cn } from "@/lib/utils";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LinkButton } from "@/components/link-button";

export async function generateMetadata() {
  const t = await getI18n();

  return {
    title: getSiteName(t("blogPage")),
    description: t("blogPageDescription"),
  };
}

export default async function Blog({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setStaticParamsLocale(locale);
  const t = await getI18n();
  const posts = await new PostRepository().getAll(locale);
  return (
    <div className={"flex flex-col justify-center pt-4"}>
      <H1>{t("blogPage")}</H1>
      <P>{t("blogPageDescription")}</P>

      <div className={"maxw95vw flex flex-col justify-center gap-4 pt-4"}>
        {posts.map((post) => {
          return (
            <Card key={post.slug}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                {" "}
                <LinkButton
                  href={`/blog/post/${post.slug}`}
                  variant={"outline"}
                >
                  Read
                </LinkButton>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
