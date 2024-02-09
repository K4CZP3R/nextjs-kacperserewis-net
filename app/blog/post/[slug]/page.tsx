import { MDXRemote } from "next-mdx-remote/rsc";
import styles from "../../../../styles/Post.module.css";

/* Import rehype-highlight */
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/atom-one-dark.css";
import { getSiteName } from "../../../../lib/get-site-name";
import { PostRepository } from "../../../../repo/post.repository";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await new PostRepository().get(params.slug);
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
  const posts = await new PostRepository().getAll();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Index({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await new PostRepository().get(slug);

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
