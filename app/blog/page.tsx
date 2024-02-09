import Button from "../../components/button/button";
import Card from "../../components/card/card";
import { getSiteName } from "../../lib/get-site-name";
import { IPost } from "../../models/post.model";
import { PostRepository } from "../../repo/post.repository";
import styles from "../../styles/Blog.module.css";

export async function generateMetadata() {
  return {
    title: getSiteName("Blog"),
    description: "Here are some of my posts.",
  };
}

export default async function Blog() {
  const posts = await new PostRepository().getAll();
  return (
    <div className={styles.content}>
      <h1>Blog</h1>
      <p>Here are some of my posts.</p>

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
