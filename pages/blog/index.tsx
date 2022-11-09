import Button from "../../components/button/button";
import Card from "../../components/card/card";
import { IPost } from "../../models/post.model";
import { PostQlRepository } from "../../repo/post-ql.repository";
import { ProjectQlRepository } from "../../repo/project-ql.repository";
import styles from "../../styles/Blog.module.css";

export default function Blog({ posts }: { posts: IPost[] }) {
  return (
    <div className={styles.content}>
      <h1>Blog</h1>
      <p>Here are some of my posts.</p>

      <div className={styles.blog}>
        {posts.map((post) => (
          <Card
            key={post.id}
            title={post.title}
            description={post.description}
            hashTags={post.tags.map((t) => t.value)}
            subTitle={
              "Created at: " + new Date(post.createdAt).toLocaleDateString()
            }
          >
            <Button path={`/blog/${post.slug}`}>Read</Button>
          </Card>
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
