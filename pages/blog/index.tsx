import Card from "../../components/card/card";
import { IPost } from "../../models/post.model";
import { IProject } from "../../models/project.model";
import { PostQlRepository } from "../../repo/post-ql.repository";
import { ProjectQlRepository } from "../../repo/project-ql.repository";
import styles from "../../styles/Projects.module.css";

export default function Blog({ posts }: { posts: IPost[] }) {
  return (
    <div className={styles.content}>
      <h1>Blog</h1>

      <div className={styles.projects}>
        {posts.map((post) => (
          <Card
            key={post.id}
            title={post.title}
            description={post.description}
            link={`/blog/${post.slug}`}
            linkText="View Post"
          ></Card>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const proj = new PostQlRepository();
  const posts = await proj.getAll();
  return {
    props: {
      posts: posts,
    },
  };
}
