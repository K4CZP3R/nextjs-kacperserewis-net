import { IPost } from "../../models/post.model";
import { PostQlRepository } from "../../repo/post-ql.repository";

export default function Index({ post }: { post: IPost | null }) {
  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <div>
      <h1>{post.title}</h1>
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
  const post = await new PostQlRepository().getBySlug(params.slug);
  return {
    props: {
      post: post && post.length > 0 ? post[0] : null,
    },
  };
}
