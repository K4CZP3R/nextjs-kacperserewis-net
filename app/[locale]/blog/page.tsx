import Button from "../../../components/button/button";
import Card from "../../../components/card/card";
import { getSiteName } from "../../../lib/get-site-name";
import { getI18n, getStaticParams } from "../../../locales/server";
import { PostRepository } from "../../../repo/post.repository";
import styles from "../../../styles/Blog.module.css";
import { Locale } from "../../../locales/consts";
import { setStaticParamsLocale } from "next-international/server";

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
    <div className={styles.content}>
      <h1>{t("blogPage")}</h1>
      <p>{t("blogPageDescription")}</p>

      <div className={styles.blog}>
        {posts.map((post) => {
          return (
            <Card
              key={post.slug}
              title={post.title}
              description={post.description}
              hashTags={post.tags}
              dateRaw={post.createdAt}
            >
              <Button path={`/blog/post/${post.slug}`}>Read</Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
