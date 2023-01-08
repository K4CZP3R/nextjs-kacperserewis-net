import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { IPost } from "../../models/post.model";
import { PostRepository } from "../../repo/post.repository";
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
  const posts = await new PostRepository().getAll();

  const slugs = posts.map((post) => post.slug);

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
  const post = await new PostRepository().get(params.slug);

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
