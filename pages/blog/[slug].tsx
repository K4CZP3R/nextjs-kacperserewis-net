import MarkdownRender from "../../components/markdown-render/markdown-render";
import { IPost } from "../../models/post.model";
import { PostQlRepository } from "../../repo/post-ql.repository";
import styles from "../../styles/Post.module.css";

export default function Index({ post }: { post: IPost | null }) {
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className={styles.content}>
      <h1>{post.title}</h1>
      <MarkdownRender rawMarkdown={post.content} />
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
  return {
    props: {
      post: post,
    },
  };
}
