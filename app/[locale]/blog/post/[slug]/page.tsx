import { MDXRemote } from "next-mdx-remote/rsc";
import styles from "../../../../../styles/Post.module.css";

/* Import rehype-highlight */
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/atom-one-dark.css";
import { getSiteName } from "../../../../../lib/get-site-name";
import { PostRepository } from "../../../../../repo/post.repository";
import { Locale } from "../../../../../locales/consts";
import { setStaticParamsLocale } from "next-international/server";

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: Locale };
}) {
  const post = await new PostRepository().get(params.slug, params.locale);
  return {
    title: getSiteName(post?.title || "Post"),
    description: post?.description,
  };
}

const components = {
  pre: (props: any) => <pre className={styles.pre} {...props} />,
  code: (props: any) => <code className={styles.code} {...props} />,
};

export async function generateStaticParams() {
  const locales: Locale[] = ["en", "nl", "pl"];

  const allPaths = [];
  for (const locale of locales) {
    const posts = await new PostRepository().getAll(locale);
    const paths = posts.map((post) => ({
      slug: post.slug,
      locale,
    }));

    allPaths.push(...paths);
  }

  return allPaths;
}

export default async function Index({
  params,
}: {
  params: { slug: string; locale: Locale };
}) {
  setStaticParamsLocale(params.locale);

  const { slug } = params;
  const post = await new PostRepository().get(slug, params.locale);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className={styles.content}>
      <h1 className={styles.header}>{post.title}</h1>
      <div className="wrapper">
        {/* @ts-ignore */}
        <MDXRemote
          key={"aa"}
          options={{ mdxOptions: { rehypePlugins: [rehypeHighlight] } }}
          source={post.content}
          components={components}
        />
      </div>
    </div>
  );
}
