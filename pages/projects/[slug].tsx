import { IProject } from "../../models/project.model";
import { ProjectQlRepository } from "../../repo/project-ql.repository";
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
  const slugs = await new ProjectQlRepository().getSlugs();

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
  const project = await new ProjectQlRepository().getBySlug(params.slug);
  return {
    props: {
      project: project && project.length > 0 ? project[0] : null,
    },
  };
}
