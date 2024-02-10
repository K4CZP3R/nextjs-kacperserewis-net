import { MDXRemote } from "next-mdx-remote/rsc";
import styles from "../../../../../styles/Post.module.css";

/* Import rehype-highlight */
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/atom-one-dark.css";
import { getSiteName } from "../../../../../lib/get-site-name";
import { PostRepository } from "../../../../../repo/post.repository";
import { Locale } from "../../../../../locales/consts";
import { setStaticParamsLocale } from "next-international/server";
import { H1, H2, H3, H4, InlineCode, P } from "@/components/text";

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
  pre: (props: any) => (
    <pre className="bg-muted rounded overflow-x-auto" {...props} />
  ),
  code: (props: any) => <InlineCode {...props} />,
  h1: (props: any) => <H1 {...props} />,
  h2: (props: any) => <H2 {...props} />,
  h3: (props: any) => <H3 {...props} />,
  h4: (props: any) => <H4 {...props} />,
  p: (props: any) => <P {...props} />,
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
      <H1>{post.title}</H1>
      <div className="wrapper" style={{ paddingTop: "2rem" }}>
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
