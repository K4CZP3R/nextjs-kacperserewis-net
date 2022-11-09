import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { IPost } from "../../models/post.model";
import { PostQlRepository } from "../../repo/post-ql.repository";
import styles from "../../styles/Post.module.css";

/* Import rehype-highlight */
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/atom-one-dark.css";

const components = {
  pre: (props: any) => <pre className={styles.pre} {...props} />,
};

export default function Index({
  post,
  markdown,
}: {
  post: IPost | null;
  markdown: MDXRemoteSerializeResult<Record<any, any>> | null;
}) {
  if (!post || !markdown) {
    return <div>Post not found</div>;
  }

  return (
    <div className={styles.content}>
      <h1>{post.title}</h1>
      <div className="wrapper">
        <MDXRemote {...markdown} components={components} />
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const slugs = await new PostQlRepository().getSlugs();

  let paths = slugs.map((slug) => {
    return {
      params: {
        slug: slug,
      },
    };
  });

  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const postRaw = await new PostQlRepository().getBySlug(params.slug);

  let post = postRaw && postRaw.length > 0 ? postRaw[0] : null;

  let markdown = post
    ? await serialize(post.content, {
        mdxOptions: {
          rehypePlugins: [rehypeHighlight],
        },
      })
    : null;

  return {
    props: {
      post: post,
      markdown: markdown,
    },
  };
}
