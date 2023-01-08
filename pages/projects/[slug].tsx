import { IProject } from "../../models/project.model";
import { ProjectRepository } from "../../repo/project.repository";
import styles from "../../styles/Project.module.css";

export default function Index({ project }: { project: IProject | null }) {
  if (!project) {
    return <div>Project not found</div>;
  }
  return (
    <div className={styles.content}>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
    </div>
  );
}

export async function getStaticPaths() {
  const projects = await new ProjectRepository().getAll();
  const slugs = projects.map((project) => project.slug);

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
  const project = await new ProjectRepository().get(params.slug);
  console.log("project is", project);
  return {
    props: {
      project: project || null,
    },
  };
}
