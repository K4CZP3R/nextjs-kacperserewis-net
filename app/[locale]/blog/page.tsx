import Card from "../../../components/card/card";
import { getSiteName } from "../../../lib/get-site-name";
import { getI18n, getStaticParams } from "../../../locales/server";
import { PostRepository } from "../../../repo/post.repository";
import styles from "../../../styles/Blog.module.css";
import { Locale } from "../../../locales/consts";
import { setStaticParamsLocale } from "next-international/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { H1, P } from "@/components/text";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}) {
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
    <div className={cn(styles.content, "pt-4")}>
      <H1>{t("blogPage")}</H1>
      <P>{t("blogPageDescription")}</P>

      <div className={cn(styles.blog, "pt-4")}>
        {posts.map((post) => {
          return (
            <Card
              key={post.slug}
              title={post.title}
              description={post.description}
              hashTags={post.tags}
              dateRaw={post.createdAt}
            >
              <Button variant={"outline"} asChild>
                <Link href={`/blog/post/${post.slug}`}>Read</Link>
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
