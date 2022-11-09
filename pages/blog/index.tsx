import Card from "../../components/card/card";
import { IPost } from "../../models/post.model";
import { PostQlRepository } from "../../repo/post-ql.repository";
import styles from "../../styles/Blog.module.css";

export default function Blog({ posts }: { posts: IPost[] }) {
  return (
    <div className={styles.content}>
      <h1>Blog</h1>

      <div className={styles.blog}>
        {posts.map((post) => (
          <Card
            key={post.id}
            title={post.title}
            description={post.description}
            subTitle=""
            link={`/blog/${post.slug}`}
            linkText="View Post"
          ></Card>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const repo = new PostQlRepository();
  const posts = await repo.getAll();
  return {
    props: {
      posts: posts,
    },
  };
}
