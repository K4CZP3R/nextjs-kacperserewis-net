import Button from "../../components/button/button";
import Card from "../../components/card/card";
import Seo from "../../components/seo/seo";
import { IPost } from "../../models/post.model";
import { PostRepository } from "../../repo/post.repository";
import styles from "../../styles/Blog.module.css";

export default function Blog({ posts }: { posts: IPost[] }) {
  return (
    <div className={styles.content}>
      <Seo title="Blog" description="Here are some of my posts."></Seo>
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

export async function getStaticProps() {
  const posts = await new PostRepository().getAll();
  return {
    props: {
      posts: posts,
    },
  };
}
